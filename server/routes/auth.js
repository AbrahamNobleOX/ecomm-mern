import express from "express";
const router = express.Router();

// middlewares
import { requireSignin, isAdmin } from "../middlewares/auth.js";

import { register, login, secret, authcheck } from "../controllers/auth.js";

// Define routes. GET route (expressjs)
router.post("/register", register);
router.post("/login", login);
router.get("/auth-check", requireSignin, authcheck);

router.get("/secret", requireSignin, isAdmin, secret);

export default router;
