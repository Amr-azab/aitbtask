const supportModel = require("./model");
const multer = require("multer");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const AppError = require("../utlis/appError"); // Import your AppError class
const catchAsync = require("../utlis/catchAsync"); // Import your catchAsync wrapper
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const generateToken = require("../utlis/generateToken");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../public/images")); // Store in public/images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Add timestamp to the filename
  },
});
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const mimeType = allowedTypes.test(file.mimetype);
  const extName = allowedTypes.test(path.extname(file.originalname));

  if (mimeType && extName) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};
const upload = multer({ storage, fileFilter });
exports.addItem = [
  upload.single("photo"), // Use multer middleware to handle file upload
  catchAsync(async (req, res, next) => {
    const { name, price, description } = req.body;
    const imagePath = req.file ? `/images/${req.file.filename}` : null; // Store relative image path in DB

    const itemId = await supportModel.addItem(
      name,
      price,
      description,
      imagePath
    );
    res.status(201).json({ message: "Item added successfully", itemId });
  }),
];
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
exports.addItem = [
  upload.single("photo"), // Use multer middleware to handle file upload
  catchAsync(async (req, res, next) => {
    const { name, price, description } = req.body;
    const imagePath = req.file ? `/images/${req.file.filename}` : null; // Store relative image path in DB

    const itemId = await supportModel.addItem(
      name,
      price,
      description,
      imagePath
    );
    res.status(201).json({ message: "Item added successfully", itemId });
  }),
];

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

  const updatedItem = await supportModel.updateItem(itemId, {
    name,
    price,
    description,
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
      generatedGuiId: updatedTicket.generatedGuiId,
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
