import User from "../models/user.schema.js";
import asyncHandle from "../utils/asyncHandler.js";
import CustomError from "../utils/CustomError.js";

export const cookieOptions = {
  expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
  httpOnly: true,
};

export const signUp = asyncHandle(async (req, res) => {
  // getting data from user
  const { name, email, password } = req.body;

  //validations
  if (!name || !email || !password) {
    throw new CustomError("please add all required fields", 400);
  }

  const existingUser = User.findOne({ email: email });
  //                    or
  //const existingUser = User.findOne({email });

  if (existingUser) {
    throw new CustomError("user already exists", 400);
  }

  // create user in db
  const user = await User.create({
    name,
    email,
    password,
  });

  const token = User.getJWTtoken();

  user.password = undefined;

  // store token in user cookie
  res.cookie("token", token, cookieOptions);

  res.status(200).json({
    success: true,
    token,
    user,
  });
});

export const login = asyncHandle(async (req, res) => {
  const { email, password } = req.body;

  const user = User.findOne({ email }).select("+password");

  if (!user) {
    throw new CustomError("user does not exists", 400);
  }

  const isPasswordMatches = User.comparePassword(password);

  if (isPasswordMatches) {
    const token = User.getJWTtoken();
    user.password = undefined;
    res.cookie("token", token, cookieOptions);
    return res.status(200).json({
      success: true,
      token,
      user,
    });
  }
  throw new CustomError("password id incorrect", 400);
});

export const logout = asyncHandle(async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});
