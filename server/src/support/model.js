const knex = require("../../db/knex");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
// Function to generate a unique ID
const generateUniqueId = () => {
  return crypto.randomBytes(10).toString("hex"); // Generates a 20-character alphanumeric string
};

exports.signIn = async (email, password) => {
  // Retrieve the user from the database
  const user = await knex("users")
    .select("id", "username", "email", "password", "role") // Select password here
    .where({ email, role: "Support", isDeleted: 0 })
    .first();

  // Check if the user exists
  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Compare the provided password with the stored hashed password
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new Error("Invalid email or password");
  }

  return user;
};

// View all tickets created by users
exports.viewAllTickets = async () => {
  return await knex("tickets")
    .join("users", "tickets.user_id", "users.id")
    .join("items", "tickets.item_id", "items.id")
    .select(
      "tickets.id as ticket_id",
      "tickets.generatedGuiId",
      "users.username as customer",
      "items.name as item_name",
      "tickets.status",
      "tickets.description",
      "tickets.created_at"
    )
    .where("tickets.isActive", 1)
    .whereNotIn("tickets.status", ["Canceled", "Resolved"]); // Exclude these statuses
};

// Add a new item
exports.addItem = async (name, price, description, imagePath) => {
  const itemId = generateUniqueId(); // Generate a unique ID for the item
  await knex("items").insert({
    id: itemId, // Add the generated ID
    name,
    price,
    description,
    photo: imagePath, // Store the image path
    isActive: 1,
    isDeleted: 0,
  });
  const [newItem] = await knex("items").where({ id: itemId });

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
// Update an item
exports.updateItem = async (itemId, data) => {
  await knex("items").where({ id: itemId, isDeleted: 0 }).update(data);
  const updatedItem = await knex("items")
    .select("name", "price", "description", "photo")
    .where({ id: itemId, isDeleted: 0 })
    .first();
  if (!updatedItem) {
    return null;
  }

  return updatedItem;
};

// Update a ticket
exports.updateTicket = async (ticketId, data) => {
  await knex("tickets").where({ id: ticketId, isDeleted: 0 }).update(data);
  const updatedTicket = await knex("tickets")
    .select(
      "id",
      "generatedGuiId",
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

exports.viewAllItems = async () => {
  return await knex("items")
    .select("id", "name", "price", "description", "photo")
    .where({ isActive: 1, isDeleted: 0 });
};
