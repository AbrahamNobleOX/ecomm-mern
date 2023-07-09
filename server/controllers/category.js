import Category from "../models/category.js";
import Product from "../models/product.js";
import slugify from "slugify";

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

    const csvData = await Category.find()
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

// export const exportCSV = async (req, res) => {
//   try {
//   } catch (err) {
//     console.log(err);
//     return res.status(400).json(err.message);
//   }
// };

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
