import mongoose from "mongoose";
// const { Schema, model } = mongoose;
import { generatePrefixedId } from "../utils/globalfunctions.js";

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => generatePrefixedId("uid"),
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 64,
    },
    address: {
      type: String,
      trim: true,
    },
    role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
