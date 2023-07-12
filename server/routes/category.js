import express from "express";
const router = express.Router();

// middlewares
import { requireSignin, isAdmin } from "../middlewares/auth.js";

// controllers
import {
  create,
  update,
  remove,
  list,
  read,
  productsByCategory,
  uploadCSV,
  multiDelete,
} from "../controllers/category.js";

router.post("/category", requireSignin, isAdmin, create);
router.put("/category/:categoryId", requireSignin, isAdmin, update);
router.delete("/category/:categoryId", requireSignin, isAdmin, remove);
router.get("/categories", list);
router.get("/category/:slug", read);
router.get("/products-by-category/:slug", productsByCategory);
router.post("/uploadcsv", uploadCSV);
router.delete("/categories/delete", requireSignin, isAdmin, multiDelete);

export default router;
