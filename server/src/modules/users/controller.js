const userModel = require("./model");
const AppError = require("../../utlis/appError"); // Adjust path as needed
const catchAsync = require("../../utlis/catchAsync"); // Adjust path as needed
const jwt = require("jsonwebtoken");
const signUpvalidation = require("./validations/signup");
const signInvalidation = require("./validations/signin");
const bcrypt = require("bcrypt");
const generateToken = require("../../utlis/generateToken");
exports.signUp = catchAsync(async (req, res, next) => {
  const { username, email, password, phone, role } = req.body;
  const isValidSignUp = signUpvalidation.isValid(
    username,
    phone,
    email,
    password
  );
  if (!isValidSignUp) {
    return next(new AppError("Invalid input data", 400));
  }
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 12);
  const userId = await userModel.signUp(
    username,
    email,
    hashedPassword,
    phone,
    role
  );
  const token = generateToken(userId);
  const user = await userModel.selectUserById(userId);
  res.status(201).json({
    message: "User registered successfully",
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      phone: user.phone,
      role: user.role,
      isActive: user.isActive,
      isDeleted: user.isDeleted,
    },
    token,
  });
});

exports.signIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const isValidSignIn = signInvalidation.isValid(email, password);
  if (!isValidSignIn) {
    return next(new AppError("Invalid input data", 400));
  }

  // Retrieve the user from the database and compare passwords
  const user = await userModel.signIn(email, password);
  const token = generateToken(user.id);

  res.status(200).json({
    message: "Sign-in successful",
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    }, // Avoid sending the password back
    token,
  });
});

exports.signOut = catchAsync(async (req, res, next) => {
  // Clear the JWT token from cookies
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0), // Set to a past date to clear the cookie
  });
  res.set("Authorization", ""); // Clear Authorization header
  res.status(200).json({
    message: "User signed out successfully",
  });
});

exports.getMe = catchAsync(async (req, res, next) => {
  const userId = req.user.id; // `protect` middleware extracts user ID from token

  // Retrieve the user details by ID
  const user = await userModel.selectUserById(userId);

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  res.status(200).json({
    message: "User data retrieved successfully",
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      phone: user.phone,
      role: user.role,
      isActive: user.isActive,
      isDeleted: user.isDeleted,
    },
  });
});
exports.getAllUsers = catchAsync(async (req, res, next) => {
  if (req.user.role !== "Admin") {
    return next(new AppError("You are not admin", 403)); // Forbidden if not admin
  }
  const users = await userModel.selectUsers();
  res.status(200).json(users);
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const userId = req.params.id;

  // Check if the user exists before attempting to delete
  const user = await userModel.selectUserById(userId); // Assuming a function like this exists

  if (!user || user.isActive === 0) {
    return next(new AppError("User not found", 404)); // User not found or already deleted
  }

  // Proceed with soft delete (mark as deleted)
  await userModel.deleteUser(userId);

  res.status(200).json({ message: "User deleted successfully" });
});

exports.restoreUser = catchAsync(async (req, res, next) => {
  // const { id } = req.params;

  await userModel.restoreUser(req.params.id);
  res.status(200).json({ message: "User restored successfully" });
});
