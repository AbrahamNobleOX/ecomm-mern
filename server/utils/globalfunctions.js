import mongoose from "mongoose";

export const generatePrefixedId = (prefix) => {
  return `${prefix}-${new mongoose.Types.ObjectId()}`;
};
