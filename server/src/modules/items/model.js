const knex = require("../../../db/knex");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const generateUniqueId = () => {
  return crypto.randomBytes(10).toString("hex"); // Generates a 20-character alphanumeric string
};
exports.addItem = async (name, price, description, imagePath) => {
  const itemId = generateUniqueId();

  // Insert the new item
  await knex("items").insert({
    id: itemId,
    name,
    price,
    description,
    photo: imagePath,
    isActive: 1,
    isDeleted: 0,
  });

  // Select and return the newly added item data
  const newItem = await knex("items")
    .select("id", "name", "price", "description", "photo")
    .where({ id: itemId })
    .first(); // Fetch the first result (the new item)

  return newItem;
};
exports.deleteItem = async (itemId) => {
  return knex("items")
    .update({
      isDeleted: 1,
      isActive: 0,
    })
    .where("id", itemId);
};
exports.selectItemById = async (itemId) => {
  return await knex("items")
    .select("id", "name", "price", "description", "isActive", "isDeleted")
    .where("id", itemId)
    .first(); // Fetch the first result (or null if not found)
};

exports.getAllItems = async () => {
  return await knex("items")
    .select(
      "id",
      "name",
      "price",
      "description",
      "photo",
      "isActive",
      "isDeleted"
    )
    .where("isDeleted", 0); // Only fetch items that are not deleted
};
exports.updateItem = async (itemId, data) => {
  // Perform the update
  await knex("items").where({ id: itemId, isDeleted: 0 }).update(data);

  // Select the updated item data
  const updatedItem = await knex("items")
    .select("name", "price", "description", "photo")
    .where({ id: itemId, isDeleted: 0 })
    .first(); // Fetch the first (and only) result

  // If the item doesn't exist, return null
  if (!updatedItem) {
    return null;
  }

  return updatedItem;
};
exports.restoreItem = async (itemId) => {
  return knex("items")
    .update({
      isDeleted: 0, // Set isDeleted to 0 (not deleted)
      isActive: 1, // Set isActive to 1 (active)
    })
    .where("id", itemId);
};

