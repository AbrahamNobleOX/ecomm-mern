import Product from "../models/product.js";
import fs from "fs";
import slugify from "slugify";
import Category from "../models/category.js";
import braintree from "braintree";
import dotenv from "dotenv";

dotenv.config();

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

export const create = async (req, res) => {
  try {
    // console.log(req.fields);
    // console.log(req.files);
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    // validation
    switch (true) {
      case !name.trim():
        res.json({ error: "Name is required" });
        break;
      case !description.trim():
        res.json({ error: "Description is required" });
        break;
      case !price.trim():
        res.json({ error: "Price is required" });
        break;
      case !category.trim():
        res.json({ error: "Category is required" });
        break;
      case !quantity.trim():
        res.json({ error: "Quantity is required" });
        break;
      case !shipping.trim():
        res.json({ error: "Shipping is required" });
        break;
      case photo && photo.size > 1000000:
        res.json({ error: "Image should be less than 1mb in size" });
        break;
      default:
    }

    const existingProduct = await Product.findOne({ name: name });
    if (existingProduct) {
      return res.json({ error: "Product Already exists" });
    }

    const existingCategory = await Category.findOne({ _id: category });
    if (!existingCategory) {
      return res.json({ error: "Category Does not Exist" });
    }

    // create product
    const product = new Product({ ...req.fields, slug: slugify(name) });

    // add data to the photo object in the product model
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    await product.save();
    res.json(product);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

export const list = async (req, res) => {
  try {
    const products = await Product.find({})
      .select("-photo")
      .populate("category")
      .limit(12)
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

export const read = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");

    res.json(product);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

export const photo = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId).select(
      "photo"
    );
    // res.json(product);
    if (product.photo.data) {
      res.set("Content-Type", product.photo.contentType);
      return res.send(product.photo.data);
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

export const remove = async (req, res) => {
  try {
    const removed = await Product.findByIdAndDelete(
      req.params.productId
    ).select("-photo");
    res.json({ status: "Successfully Deleted", removed });
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

export const update = async (req, res) => {
  try {
    // console.log(req.fields);
    // console.log(req.files);
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    // validation
    switch (true) {
      case !name.trim():
        res.json({ error: "Name is required" });
        break;
      case !description.trim():
        res.json({ error: "Description is required" });
        break;
      case !price.trim():
        res.json({ error: "Price is required" });
        break;
      case !category.trim():
        res.json({ error: "Category is required" });
        break;
      case !quantity.trim():
        res.json({ error: "Quantity is required" });
        break;
      case !shipping.trim():
        res.json({ error: "Shipping is required" });
        break;
      case photo && photo.size > 1000000:
        res.json({ error: "Image should be less than 1mb in size" });
        break;
      default:
    }

    const existingCategory = await Category.findOne({ _id: category });
    if (!existingCategory) {
      return res.json({ error: "Category Does not Exist" });
    }

    // update product
    const product = await Product.findByIdAndUpdate(
      req.params.productId,
      {
        ...req.fields,
        slug: slugify(name),
      },
      { new: true }
    );

    // add data to the photo object in the product model
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    await product.save();
    res.json(product);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

export const filteredProducts = async (req, res) => {
  try {
    // Get the `checked` and `radio` values from the request body.
    const { checked, radio } = req.body;

    // Prepare an object to store the filtering criteria.
    const args = {};

    // If there are categories checked, set the `category` property of `args` to the checked categories.
    if (checked.length > 0) {
      args.category = checked;
    }

    // If there is a price range specified, set the `price` property of `args` accordingly. gte and lte means greater than or equal to and less than or equal to respectively.
    if (radio.length) {
      args.price = { $gte: radio[0], $lte: radio[1] };
    }

    // Output the filtering criteria to the console.
    console.log("Filtering criteria:", args);

    // Search for products that match the filtering criteria.
    const products = await Product.find(args);

    // Output the number of filtered products found.
    console.log("Filtered products count:", products.length);

    // Send the filtered products as a JSON response.
    res.json(products);
  } catch (err) {
    // Log any errors that occur during the process.
    console.log(err);
  }
};

export const productsCount = async (req, res) => {
  try {
    const total = await Product.find({}).estimatedDocumentCount();
    res.json(total);
  } catch (err) {
    console.log(err);
  }
};

export const listProducts = async (req, res) => {
  try {
    // Number of products to display per page
    const perPage = 2;

    // Current page number obtained from the request parameters
    const page = req.params.page ? req.params.page : 1;

    // Finding products in the database
    const products = await Product.find({})
      // Excluding the "photo" field from the selected product data
      .select("-photo")
      // Skipping the appropriate number of products based on the page number
      .skip((page - 1) * perPage)
      // Limiting the number of products per page
      .limit(perPage)
      // Sorting the products by their creation date in descending order
      .sort({ createdAt: -1 });

    // Sending the retrieved products as a JSON response
    res.json(products);
  } catch (err) {
    // Handling any errors that occur and logging them to the console
    console.log(err);
  }
};

export const productsSearch = async (req, res) => {
  try {
    // Extract the 'keyword' parameter from the request parameters
    const { keyword } = req.params;

    // Find products that match the keyword in either the 'name' or 'description' fields
    const results = await Product.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    }).select("-photo");

    // Respond with the search results in JSON format
    res.json(results);
  } catch (err) {
    // If an error occurs, log the error to the console
    console.log(err);
  }
};

export const relatedProducts = async (req, res) => {
  try {
    // Destructure the `productId` and `categoryId` from `req.params`
    const { productId, categoryId } = req.params;

    // Find related products based on the category and exclude the current product
    const related = await Product.find({
      category: categoryId,
      _id: { $ne: productId }, // using the $ne (not equal) operator.
    })
      .select("-photo") // Exclude the "photo" field from the retrieved documents
      .populate("category") // Populate the "category" field with the corresponding category document
      .limit(2); // Limit the number of related products to 3

    // Respond with the related products in JSON format
    res.json(related);
  } catch (err) {
    console.log(err);
  }
};

export const getToken = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(response);
      }
    });
  } catch (err) {
    console.log(err);
  }
};

export const processPayment = async (req, res) => {
  try {
    // console.log(req.body);
    const { nonce, total } = req.body;

    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          res.send(result);
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};
