import mongoose from "mongoose";
import { generatePrefixedId } from "../utils/globalfunctions.js";

const orderSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => generatePrefixedId("oid"),
    },
    products: [{ type: String, ref: "Product" }],
    payment: {},
    buyer: { type: String, ref: "User" },
    status: {
      type: String,
      default: "Not processed",
      enum: [
        "Not processed",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
