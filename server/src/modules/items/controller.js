const itemModel = require("./model");
const AppError = require("../../utlis/appError");
const catchAsync = require("../../utlis/catchAsync");
const jwt = require("jsonwebtoken");
const itemValidation = require("./validations/createItem");
const generateToken = require("../../utlis/generateToken");
const upload = require("../../utlis/upload");
exports.addItem = catchAsync(async (req, res, next) => {
  const { name, price, description } = req.body;
  const imagePath = req.file ? `/images/${req.file.filename}` : null;
  const isItemValid = itemValidation.isValidItem(name, price);
  if (!isItemValid) {
    return next(new AppError("Invalid input data", 400));
  }
  const newItem = await itemModel.addItem(name, price, description, imagePath);
  res.status(201).json({
    message: "Item added successfully",
    newItem,
  });
});
exports.deleteItem = catchAsync(async (req, res, next) => {
  const itemId = req.params.itemId;

  // Check if the item exists and if it is active
  const item = await itemModel.selectItemById(itemId);

  if (!item || item.isActive === 0) {
    return next(new AppError("Item not found", 404)); // Item not found or already deleted
  }

  // Proceed with soft delete (mark as deleted)
  await itemModel.deleteItem(itemId);

  res.status(200).json({ message: "Item deleted successfully" });
});
exports.restoreItem = catchAsync(async (req, res, next) => {
  const itemId = req.params.itemId;

  // Check if the item exists and is deleted
  const item = await itemModel.selectItemById(itemId);

  // if (!item || item.isActive === 1) {
  //   return next(new AppError("Item not found or already active", 404)); // Item not found or not deleted
  // }

  // Proceed with restoring the item (reset isDeleted and isActive flags)
  await itemModel.restoreItem(itemId);

  res.status(200).json({ message: "Item restored successfully" });
});
exports.getAllItems = catchAsync(async (req, res, next) => {
  const items = await itemModel.getAllItems();
  res.status(200).json({ message: "Items retrieved successfully", items });
});
exports.updateItem = catchAsync(async (req, res, next) => {
  const { itemId } = req.params;
  const { name, price, description } = req.body;
  const imagePath = req.file ? `/images/${req.file.filename}` : null;
  const isItemValid = itemValidation.isValidItem(name, price);
  if (!isItemValid) {
    return next(new AppError("Invalid input data", 400));
  }
  const updatedItem = await itemModel.updateItem(itemId, {
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
