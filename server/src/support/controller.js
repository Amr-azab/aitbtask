const supportModel = require("./model");
const multer = require("multer");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const AppError = require("../utlis/appError"); // Import your AppError class
const catchAsync = require("../utlis/catchAsync"); // Import your catchAsync wrapper
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const generateToken = require("../utlis/generateToken");
const upload = require("../utlis/upload");

// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRES_IN,
//   });
// };

exports.signIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Retrieve the user from the database and compare passwords
  const user = await supportModel.signIn(email, password);
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

// View all tickets created by users
exports.viewAllTickets = catchAsync(async (req, res, next) => {
  const tickets = await supportModel.viewAllTickets();
  res.status(200).json(tickets);
});

// Add a new item
exports.addItem = catchAsync(async (req, res, next) => {
  const { name, price, description } = req.body;
  const imagePath = req.file ? `/images/${req.file.filename}` : null;
  const itemId = await supportModel.addItem(
    name,
    price,
    description,
    imagePath
  );
  res.status(201).json({ message: "Item added successfully", itemId });
});

// Delete an item (soft delete by setting isDeleted and isActive flags)
exports.deleteItem = catchAsync(async (req, res, next) => {
  // const { itemId } = req.params;
  const itemId = req.params.itemId;
  const item = await supportModel.selectItemById(itemId);

  if (!item || item.isActive === 0) {
    return next(new AppError("Item not found", 404)); // Item not found or already deleted
  }
  await supportModel.deleteItem(req.params.itemId);
  res.status(200).json({ message: "Item deleted successfully" });
});

// Update an item
exports.updateItem = catchAsync(async (req, res, next) => {
  const { itemId } = req.params;
  const { name, price, description } = req.body;
  const imagePath = req.file ? `/images/${req.file.filename}` : null;
  const updatedItem = await supportModel.updateItem(itemId, {
    name,
    price,
    description,
    photo: imagePath,
  });
  if (!updatedItem) {
    return next(new AppError("Item not found", 404));
  }
  res.status(200).json({
    message: "Item updated successfully",
    updatedItem: {
      name: updatedItem.name,
      price: updatedItem.price,
      description: updatedItem.description,
      photo: updatedItem.photo,
    },
  });
});

// Update a ticket
exports.updateTicket = catchAsync(async (req, res, next) => {
  const { ticketId } = req.params;
  const { status, description } = req.body;

  const updatedTicket = await supportModel.updateTicket(ticketId, {
    status,
    description,
  });
  if (!updatedTicket) {
    return next(new AppError("Ticket not found", 404));
  }
  res.status(200).json({
    message: "Ticket updated successfully",
    updatedTicket: {
      id: updatedTicket.id,
      guiId: updatedTicket.guiId,
      status: updatedTicket.status,
      description: updatedTicket.description,
      userId: updatedTicket.user_id, // Corrected field name
      itemId: updatedTicket.item_id, // Corrected field name
      createdAt: updatedTicket.created_at, // Corrected field name
    },
  });
});

exports.viewAllItems = catchAsync(async (req, res, next) => {
  const items = await supportModel.viewAllItems();
  res.status(200).json({ message: "Items retrieved successfully", items });
});
exports.signOut = catchAsync(async (req, res, next) => {
  // Clear the JWT token from cookies
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0), // Set to a past date to clear the cookie
  });

  res.status(200).json({
    message: "User signed out successfully",
  });
});
