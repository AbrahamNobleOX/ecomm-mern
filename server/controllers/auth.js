import User from "../models/user.js";
import { hashPassword, comparePassword } from "../helpers/auth.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Example controller method. Custom middleware function
export const register = async (req, res) => {
  try {
    // 1. destructure name, email, password from req.body
    const { name, email, password } = req.body;

    // 2. all fields require validation
    if (!name.trim()) {
      return res.json({ error: "Name is required" });
    }
    if (!email) {
      return res.json({ error: "Email is required" });
    }
    if (!password || password.length < 6) {
      return res.json({
        error: "Password is required and must be at least 6 characters long",
      });
    }

    // 3. check if email is taken
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.json({ error: "Email is taken" });
    }

    // 4. hash password
    const hashedPassword = await hashPassword(password);

    // 5. register user
    const user = await new User({
      name,
      email,
      password: hashedPassword,
    }).save();

    // 6. create signed jwt
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // 7. send response
    res.json({
      user: {
        status: "Registered",
        name: user.name,
        email: user.email,
        role: user.role,
        address: user.address,
      },
      token,
    });
  } catch (err) {
    console.log(err);
  }
};

export const login = async (req, res) => {
  try {
    // 1. destructure name, email, password from req.body
    const { email, password } = req.body;
    // 2. all fields require validation
    if (!email) {
      return res.json({ error: "Email is required" });
    }
    if (!password || password.length < 6) {
      return res.json({
        error: "Password is required and must be at least 6 characters long",
      });
    }
    // 3. check if email is taken
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.json({ error: "User not found for this email" });
    }
    // 4. compare password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.json({ error: "Wrong password" });
    }
    // 5. create signed jwt
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    // 7. send response
    res.json({
      user: {
        status: "Logged In",
        name: user.name,
        email: user.email,
        role: user.role,
        address: user.address,
      },
      token,
    });
  } catch (err) {
    console.log(err);
  }
};

export const secret = async (req, res) => {
  res.json({ currentUser: req.user });
};

// // Example controller method. Custom middleware function
// export const register = async (req, res) => {
//     // Sample data
//     const data = {
//       message: "Hello World, I'm serving!",
//       timestamp: new Date(),
//     };
//     // Send JSON response with pretty-printing
//     res.set("Content-Type", "application/json");
//     res.send(JSON.stringify(data, null, 2));
// };
