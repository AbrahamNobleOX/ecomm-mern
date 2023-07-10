import mongoose from "mongoose";
import { generatePrefixedId } from "../utils/globalfunctions.js";

const categorySchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => generatePrefixedId("cid"),
  },
  name: {
    type: String,
    trim: true,
    required: true,
    // maxLength: 32,
    unique: true,
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
  },
});

export default mongoose.model("Category", categorySchema);
