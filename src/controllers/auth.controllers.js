import User from "../models/user.schema.js";
import asyncHandle from "../utils/asyncHandler.js";
import CustomError from "../utils/CustomError.js";
import mailHelper from "../utils/mailHelper.js";
import crypto from "node:crypto";

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

  const existingUser = await User.findOne({ email });
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

  const token = user.getJWTtoken();
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

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new CustomError("user does not exists", 400);
  }

  const isPasswordMatches = await user.comparePassword(password);

  if (isPasswordMatches) {
    const token = user.getJWTtoken();
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

export const getProfile = asyncHandle(async (req, res) => {
  const { user } = req;

  if (!user) {
    throw new CustomError("User not found", 401);
  }

  res.status(200).json({
    success: true,
    user,
  });
});

export const forgotPassword = asyncHandle(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomError("User not found", 404);
  }

  const resetToken = user.generateForgotPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/auth/password/reset/${resetToken}`;

  const message = `Your password reset token is as follows \n\n ${resetUrl} \n\n if this was not requested by you, please ignore.`;

  try {
    await mailHelper({
      email: user.email,
      subject: "password reset",
      message,
    });
    res.status(200).json({
      success: true,
      message: "Password reset email is sent successfully.",
    });
  } catch (error) {
    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiry = undefined;

    await user.save({ validateBeforeSave: false });

    throw new CustomError(error.message || "email not been sent", 500);
  }
});

export const resetPassword = asyncHandle(async (req, res) => {
  const { token: resetToken } = req.params;
  const { password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    throw new CustomError("password does not match", 400);
  }

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const user = await User.findOne({
    forgotPasswordToken: resetPasswordToken,
    forgotPasswordExpiry: { $gt: Date.now() },
  });

  if (!user) {
    throw new CustomError("password reset token is invalid or expired", 400);
  }

  user.password = password;
  user.forgotPasswordToken = undefined;
  user.forgotPasswordExpiry = undefined;

  await user.save();

  const token = user.getJWTtoken();
  res.cookie("token", token, cookieOptions);

  res.status(200).json({
    success: true,
    user,
  });
});
