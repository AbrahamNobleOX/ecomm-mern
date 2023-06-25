import Product from "../models/product.js";
import fs from "fs";
import slugify from "slugify";
import Category from "../models/category.js";

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
