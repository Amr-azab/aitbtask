const customerModel = require("./model");
const AppError = require("../utlis/appError"); // Adjust path as needed
const catchAsync = require("../utlis/catchAsync"); // Adjust path as needed
const jwt = require("jsonwebtoken");
const signUpvalidation = require("../validations/signup");
const signInvalidation = require("../validations/signin");
const bcrypt = require("bcrypt");
const generateToken = require("../utlis/generateToken");

// Customer sign-up
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
  const userId = await customerModel.signUp(
    username,
    email,
    hashedPassword,
    phone,
    role
  );
  const token = generateToken(userId);
  const user = await customerModel.selectUserById(userId);
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

// Customer sign-in
// Customer sign-in
exports.signIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const isValidSignIn = signInvalidation.isValid(email, password);
  if (!isValidSignIn) {
    return next(new AppError("Invalid input data", 400));
  }

  // Retrieve the user from the database and compare passwords
  const user = await customerModel.signIn(email, password);
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

// View all active items
exports.viewItems = catchAsync(async (req, res, next) => {
  const items = await customerModel.viewItems();
  res.status(200).json(items);
});

// Create a new ticket for a specific item
exports.createTicket = catchAsync(async (req, res, next) => {
  const { itemId, description } = req.body;

  const ticketId = await customerModel.createTicket(
    req.user.id,
    itemId,
    description
  );
  res.status(201).json({ message: "Ticket created successfully", ticketId });
});

// View all tickets created by the customer
exports.viewMyTickets = catchAsync(async (req, res, next) => {
  // const { userId } = req.params;

  const tickets = await customerModel.viewMyTickets(req.user.id);
  res.status(200).json(tickets);
});
// Customer sign-out
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
// Retrieve user data after sign-up or sign-in
exports.getMe = catchAsync(async (req, res, next) => {
  const userId = req.user.id; // `protect` middleware extracts user ID from token

  // Retrieve the user details by ID
  const user = await customerModel.selectUserById(userId);

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
