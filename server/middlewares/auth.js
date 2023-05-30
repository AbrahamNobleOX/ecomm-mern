import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const requireSignin = async (req, res, next) => {
  try {
    // const authorizationHeader = req.headers.authorization;
    // const token = authorizationHeader
    //   ? authorizationHeader.split(" ")[1]
    //   : null;
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const decoded = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );

    // req. is used to assign a request, so here we are changing the request to "decoded". NOTE: There's no initial request, only the authorization was passed as a request.
    req.user = decoded;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ error: "Secret token required for this request" });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).json({ error: "Unauthorized for this request" });
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
  }
};
