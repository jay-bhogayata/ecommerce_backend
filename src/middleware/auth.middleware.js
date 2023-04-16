import User from "../models/user.schema.js";
import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import CustomError from "../utils/CustomError.js";
import config from "../config/index.js";

export const isLoggedIn = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.cookies.token ||
    (req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer"))
  ) {
    token = req.cookies.token || req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    throw new CustomError("Not authorized to access this resource", 401);
  }
  try {
    const decodedJwtPayload = jwt.verify(token, config.JWT_SECRET);
    req.user = await User.findById(decodedJwtPayload._id, "name email role");
    next();
  } catch (error) {
    throw new CustomError("Not authorize to access this resource", 401);
  }
});

export const authorize = (...requiredRoles) =>
  asyncHandler(async (req, res, next) => {
    if (!requiredRoles.includes(req.user.role)) {
      throw new CustomError("you are not authorize to access this resource");
    }
    next();
  });
