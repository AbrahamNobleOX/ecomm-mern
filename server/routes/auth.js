import express from "express";
const router = express.Router();

// middlewares
import { requireSignin, isAdmin } from "../middlewares/auth.js";

import {
  register,
  login,
  secret,
  authcheck,
  admincheck,
  updateProfile,
  getOrders,
  allOrders,
} from "../controllers/auth.js";

// Define routes. GET route (expressjs)
router.post("/register", register);
router.post("/login", login);
router.get("/auth-check", requireSignin, authcheck);
router.get("/admin-check", requireSignin, isAdmin, admincheck);
router.put("/profile", requireSignin, updateProfile);
router.get("/orders", requireSignin, getOrders);
router.get("/all-orders", requireSignin, isAdmin, allOrders);

// testing
router.get("/secret", requireSignin, isAdmin, secret);

export default router;
