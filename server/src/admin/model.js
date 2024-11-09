const knex = require("../../db/knex");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const generateUniqueId = () => {
  return crypto.randomBytes(10).toString("hex"); // Generates a 20-character alphanumeric string
};
// Select all users
exports.selectUsers = async () => {
  return await knex
    .select("id", "username", "email", "role", "isActive", "isDeleted")
    .from("users")
    .where("role", "!=", "Admin"); // Exclude other admins if needed
};
// Select a user by ID
exports.selectUserById = async (id) => {
  return await knex("users")
    .select("id", "username", "email", "role", "isActive", "isDeleted")
    .where("id", id)
    .first(); // Fetch the first result (or null if not found)
};

// Admin sign in
exports.signIn = async (email, password) => {
  const user = await knex("users")
    .select("id", "username", "email", "role", "password")
    .where({ email, role: "Admin" })
    .first();

  if (!user) {
    throw new Error("Invalid email or password");
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new Error("Invalid email or password");
  }
  return user;
};

// Delete a user by setting isDeleted and isActive flags
exports.deleteUser = async (id) => {
  return knex("users")
    .update({
      isDeleted: 1,
      isActive: 0,
    })
    .where("id", id);
};

// Restore a user by resetting isDeleted and isActive flags
exports.restoreUser = async (id) => {
  return knex("users")
    .update({
      isDeleted: 0,
      isActive: 1,
    })
    .where("id", id);
};

// Add an item
// Add a new item
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

// Delete an item by setting isDeleted and isActive flags
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

// View all tickets created by users
exports.viewTickets = async () => {
  return await knex("tickets")
    .join("users", "tickets.user_id", "users.id")
    .join("items", "tickets.item_id", "items.id")
    .select(
      "tickets.id as ticket_id",
      "tickets.guiId",
      "users.username as customer",
      "items.name as item",
      "tickets.status",
      "tickets.description",
      "tickets.created_at"
    )
    // .where("tickets.isActive", 1)
    .whereNotIn("tickets.status", ["Canceled", "Resolved"]); // Exclude tickets with Canceled or Resolved status
};
// Get all items
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

// Update an item
// Update an item
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

// Update a ticket
exports.updateTicket = async (ticketId, data) => {
  // Update the ticket
  await knex("tickets").where({ id: ticketId, isDeleted: 0 }).update(data);

  // Select and return the updated ticket details
  const updatedTicket = await knex("tickets")
    .select(
      "id",
      "guiId",
      "status",
      "description",
      "user_id",
      "item_id",
      "created_at",
      "updated_at"
    ) // Use the correct column names
    .where({ id: ticketId, isDeleted: 0 })
    .first(); // Fetch the updated ticket

  return updatedTicket;
};

exports.deleteTicket = async (ticketId) => {
  return knex("tickets").where("id", ticketId).update({
    isDeleted: 1,
    isActive: 0,
  });
};
exports.selectTicketById = async (ticketId) => {
  return await knex("tickets")
    .select("id", "status", "description", "isActive", "isDeleted")
    .where("id", ticketId)
    .first(); // Fetch the first result (or null if not found)
};
// Restore an item by resetting isDeleted and isActive flags
exports.restoreItem = async (itemId) => {
  return knex("items")
    .update({
      isDeleted: 0, // Set isDeleted to 0 (not deleted)
      isActive: 1, // Set isActive to 1 (active)
    })
    .where("id", itemId);
};
exports.restoreTicket = async (ticketId) => {
  return knex("tickets")
    .update({
      isDeleted: 0,
      isActive: 1,
    })
    .where("id", ticketId);
};
