import Category from "../models/category.js";
import Product from "../models/product.js";
import slugify from "slugify";
import { payloadSize } from "../helpers/category.js";

export const create = async (req, res) => {
  try {
    // console.log(req.body);
    const { name } = req.body;
    if (!name.trim()) {
      return res.json({ error: "Category Name is required" });
    }

    const existingCategory = await Category.findOne({ name: name });
    if (existingCategory) {
      return res.json({ error: "Category Already exists" });
    }

    const category = await new Category({
      name: name,
      slug: slugify(name),
    }).save();
    res.json(category);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

export const update = async (req, res) => {
  try {
    const { name } = req.body;
    const { categoryId } = req.params;
    const category = await Category.findByIdAndUpdate(
      categoryId,
      {
        name,
        slug: slugify(name),
      },
      { new: true }
    );
    res.json(category);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

export const remove = async (req, res) => {
  try {
    const removed = await Category.findByIdAndDelete(req.params.categoryId);
    res.json({ status: "Successfully Deleted", removed });
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

export const multiDelete = async (req, res) => {
  try {
    const selectedItems = await req.query.selectedItems;
    console.log(selectedItems);

    // Create an array to store the promises returned by saving each object
    const savePromises = [];

    // Iterate over each object in the parsedData array
    await selectedItems.forEach((dataObj) => {
      const itemId = dataObj;

      // Save the data to the database and push the promise to the savePromises array
      const savePromise = Category.findByIdAndDelete(itemId).catch((error) => {
        console.error("Error deleting data in the database:", error);
      });

      // Save the data to the database and push the promise to the savePromises array
      savePromises.push(savePromise);
    });

    // Wait for all the save promises to resolve
    await Promise.all(savePromises);

    // All the JSON data have been deleted in the database
    return res.json({
      status: "Successfully Deleted",
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

// export const list = async (req, res) => {
//   try {
//     const all = await Category.find({});
//     res.json(all);
//   } catch (err) {
//     console.log(err);
//     return res.status(400).json(err.message);
//   }
// };

export const list = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Current page (default: 1)
    const perPage = parseInt(req.query.per_page) || 10; // Number of category per page (default: 5)
    // const delayDuration = parseInt(req.query.delay) || 1; // Delay duration in seconds
    const delayDuration = 0;
    const delayInMilliseconds = delayDuration * 1000; // Convert delay duration to milliseconds
    const sortField = req.query.sort || "name"; // Sort field (default: id)
    const sortDirection = req.query.order || "desc"; // Sort direction (default: asc)
    const keyword = req.query.keyword || ""; // Search keyword

    const startIndex = (page - 1) * perPage;

    const sortOptions = {};
    sortOptions[sortField] = sortDirection === "desc" ? -1 : 1;

    // Simulate a delay before querying MongoDB
    await new Promise((resolve) => setTimeout(resolve, delayInMilliseconds));

    const query = {
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { slug: { $regex: keyword, $options: "i" } },
      ],
    };

    // Query MongoDB to retrieve paginated category
    const data = await Category.find(query)
      .sort(sortOptions)
      .skip(startIndex)
      .limit(perPage)
      .exec();

    const csvData = await Category.find(query, { _id: 0, name: 1, slug: 1 })
      .sort(sortOptions)
      .skip(startIndex)
      .exec();

    // Query MongoDB to get the total number of category
    const totalRows = await Category.countDocuments(query).exec();

    const totalPages = Math.ceil(totalRows / perPage);

    res.json({
      data,
      total: totalRows,
      page,
      per_page: perPage,
      total_pages: totalPages,
      sort: sortField,
      order: sortDirection,
      csvData,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

export const uploadCSV = async (req, res) => {
  try {
    const parsedData = req.body;
    const size = payloadSize(parsedData);
    console.log(`Payload Size: ${size}`);

    // Create an array to store the promises returned by saving each object
    const savePromises = [];
    let successfulSaves = 0; // Variable to count the successful saves

    // Iterate over each object in the parsedData array
    await parsedData.forEach((dataObj) => {
      const name = dataObj.name;
      const slug = slugify(name);

      // Create a new instance of the DataModel with the current object
      const newData = new Category({
        name: name,
        slug: slug,
      });

      // Save the data to the database and push the promise to the savePromises array
      const savePromise = newData
        .save()
        .then(() => {
          successfulSaves++; // Increment the successful saves count
        })
        .catch((error) => {
          // Handle the duplicate key error
          if (error.code === 11000) {
            console.error("Duplicate key error:", error.message);
            // You can choose to skip or handle the duplicate data as needed
            // For example, you can choose to ignore the duplicate and continue with saving other data
          } else {
            console.error("Error saving data to the database:", error);
            // Handle other types of errors if needed
          }
        });

      // Save the data to the database and push the promise to the savePromises array
      savePromises.push(savePromise);
    });

    // Wait for all the save promises to resolve
    await Promise.all(savePromises);

    // Calculate the count of unsaved items
    const unsaved = parsedData.length - successfulSaves;

    // All the JSON data have been saved to the database
    return res.json({
      message: `${successfulSaves} Data saved successfully. ${unsaved} Unsaved`,
      saved: successfulSaves,
      unsaved: unsaved,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

export const read = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    res.json(category);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

export const productsByCategory = async (req, res) => {
  try {
    // Find the category document based on the slug provided in the request parameters
    const category = await Category.findOne({ slug: req.params.slug });

    // Find the products that belong to the retrieved category and populate the "category" field
    const products = await Product.find({ category }).populate("category");

    // Respond with the category and products in JSON format
    res.json({
      category,
      products,
    });
  } catch (err) {
    console.log(err);
  }
};
