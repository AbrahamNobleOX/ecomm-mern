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

export const list = async (req, res) => {
  try {
    const all = await Category.find({});
    res.json(all);
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
