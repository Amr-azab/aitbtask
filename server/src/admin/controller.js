const adminModel = require("./model");
const AppError = require("../utlis/appError");
const catchAsync = require("../utlis/catchAsync");
const jwt = require("jsonwebtoken");
const generateToken = require("../utlis/generateToken");
const upload = require("../utlis/upload");
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await adminModel.selectUsers();
  res.status(200).json(users);
});

// Admin sign-in
exports.signIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const admin = await adminModel.signIn(email, password);
  const token = generateToken(admin.id);
  res.status(200).json({
    message: "Sign-in-successful",
    user: {
      id: admin.id,
      username: admin.username,
      email: admin.email,
      role: admin.role,
    },
    token,
  });
});

// Delete a user (soft delete by setting isDeleted and isActive flags)
// Delete a user (soft delete by setting isDeleted and isActive flags)
exports.deleteUser = catchAsync(async (req, res, next) => {
  const userId = req.params.id;

  // Check if the user exists before attempting to delete
  const user = await adminModel.selectUserById(userId); // Assuming a function like this exists

  if (!user || user.isActive === 0) {
    return next(new AppError("User not found", 404)); // User not found or already deleted
  }

  // Proceed with soft delete (mark as deleted)
  await adminModel.deleteUser(userId);

  res.status(200).json({ message: "User deleted successfully" });
});

// Restore a deleted user
exports.restoreUser = catchAsync(async (req, res, next) => {
  // const { id } = req.params;

  await adminModel.restoreUser(req.params.id);
  res.status(200).json({ message: "User restored successfully" });
});

// Add a new item
// Add a new item
exports.addItem = catchAsync(async (req, res, next) => {
  const { name, price, description } = req.body;
  const imagePath = req.file ? `/images/${req.file.filename}` : null;
  const newItem = await adminModel.addItem(name, price, description, imagePath);
  res.status(201).json({
    message: "Item added successfully",
    newItem,
  });
});

// Delete an item (soft delete by setting isDeleted and isActive flags)
// Delete an item (soft delete by setting isDeleted and isActive flags)
exports.deleteItem = catchAsync(async (req, res, next) => {
  const itemId = req.params.itemId;

  // Check if the item exists and if it is active
  const item = await adminModel.selectItemById(itemId);

  if (!item || item.isActive === 0) {
    return next(new AppError("Item not found", 404)); // Item not found or already deleted
  }

  // Proceed with soft delete (mark as deleted)
  await adminModel.deleteItem(itemId);

  res.status(200).json({ message: "Item deleted successfully" });
});
// Restore a deleted item
exports.restoreItem = catchAsync(async (req, res, next) => {
  const itemId = req.params.itemId;

  // Check if the item exists and is deleted
  const item = await adminModel.selectItemById(itemId);

  // if (!item || item.isActive === 1) {
  //   return next(new AppError("Item not found or already active", 404)); // Item not found or not deleted
  // }

  // Proceed with restoring the item (reset isDeleted and isActive flags)
  await adminModel.restoreItem(itemId);

  res.status(200).json({ message: "Item restored successfully" });
});

// View all tickets created by users
exports.viewTickets = catchAsync(async (req, res, next) => {
  const tickets = await adminModel.viewTickets();
  res.status(200).json(tickets);
});
// Get all items
exports.getAllItems = catchAsync(async (req, res, next) => {
  const items = await adminModel.getAllItems();
  res.status(200).json({ message: "Items retrieved successfully", items });
});

// Update an item
// Update an item
exports.updateItem = catchAsync(async (req, res, next) => {
  const { itemId } = req.params;
  const { name, price, description } = req.body;
  const imagePath = req.file ? `/images/${req.file.filename}` : null;
  const updatedItem = await adminModel.updateItem(itemId, {
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

  const updatedTicket = await adminModel.updateTicket(ticketId, {
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

// Delete ticket controller
exports.deleteTicket = catchAsync(async (req, res, next) => {
  const { ticketId } = req.params;

  // Check if the ticket exists and if it is active
  const ticket = await adminModel.selectTicketById(ticketId);

  if (!ticket || ticket.isActive === 0) {
    return next(new AppError("Ticket not found", 404)); // Ticket not found or already deleted
  }

  // Proceed with soft delete (mark as deleted)
  await adminModel.deleteTicket(ticketId);

  res.status(200).json({ message: "Ticket deleted successfully" });
});
// Restore ticket controller
exports.restoreTicket = catchAsync(async (req, res, next) => {
  const { ticketId } = req.params;

  // Check if the ticket exists and if it is deleted
  const ticket = await adminModel.selectTicketById(ticketId);

  // if (!ticket || ticket.isDeleted === 0) {
  //   return next(new AppError("Ticket not found or already restored", 404)); // Ticket not found or already restored
  // }

  // Proceed with restoring the ticket (set isDeleted to 0 and isActive to 1)
  await adminModel.restoreTicket(ticketId);

  res.status(200).json({ message: "Ticket restored successfully" });
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
