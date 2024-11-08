const knex = require("../../db/knex");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const generateGuiId = require("../utlis/generateGuiId");
// Generate a custom unique ID (length 20)
const generateUniqueId = () => {
  return crypto.randomBytes(10).toString("hex"); // Generates a 20-character alphanumeric string
};
// Customer sign-up
// Sign-up function with role detection
exports.signUp = async (
  username,
  email,
  password,
  phone,
  role = "Customer"
) => {
  // Validate role
  const validRoles = ["Customer", "Support"];
  if (!validRoles.includes(role)) {
    throw new Error("Invalid role. Allowed roles are 'Customer' or 'Support'.");
  }

  // Check if the email is already registered
  const existingUser = await knex("users").where({ email }).first();
  if (existingUser) {
    throw new Error("Email already registered.");
  }

  // Insert new user with the specified or default role
  const userId = generateUniqueId(); // Generate the unique ID

  await knex("users").insert({
    id: userId,
    username,
    email,
    password, // Ensure password is hashed
    phone,
    role,
    isActive: 1,
    isDeleted: 0,
  });
  // .returning("id");

  return userId;
};

// Customer sign-in
// Customer sign-in
exports.signIn = async (email, password) => {
  const user = await knex("users")
    .select("id", "username", "email", "password", "role") // Ensure you are selecting the password as well
    .where({ email, role: "Customer", isDeleted: 0 })
    .first();

  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Compare the entered password with the hashed password
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new Error("Invalid email or password");
  }

  return user;
};
// Select user by ID to retrieve the complete user data
exports.selectUserById = async (userId) => {
  return await knex("users")
    .select("id", "username", "email", "phone", "role", "isActive", "isDeleted")
    .where("id", userId)
    .first(); // Fetch the first result (or null if not found)
};

// View all active items
exports.viewItems = async () => {
  return await knex("items")
    .select("id", "name", "price", "description", "photo")
    .where({ isActive: 1, isDeleted: 0 });
};

// Create a ticket for a specific item
exports.createTicket = async (userId, itemId, description) => {
  // Check if the item is active
  const item = await knex("items")
    .select("isActive")
    .where({ id: itemId, isActive: 1 })
    .first();

  if (!item) {
    throw new Error("Item is not active. Ticket cannot be created.");
  }
  // const gGuiId = await generateUniqueId("ticket", "REQ");
  // Insert new ticket
  const ticketId = generateUniqueId();
  const guiId = await generateGuiId("tickets", "REQ");
  await knex("tickets")
    .insert({
      id: ticketId,
      generatedGuiId: guiId,
      user_id: userId,
      item_id: itemId,
      status: "New",
      description: description,
      isActive: 1,
    })
    .returning("id");

  return ticketId;
};

// View tickets created by the customer
exports.viewMyTickets = async (userId) => {
  return await knex("tickets")
    .join("items", "tickets.item_id", "items.id")
    .select(
      "tickets.id as ticket_id",
      "tickets.generatedGuiId",
      "items.name as item_name",
      "tickets.status",
      "tickets.description",
      "tickets.created_at"
    )
    .where("tickets.user_id", userId)
    .andWhere("tickets.isActive", 1)
    .andWhere("tickets.status", "New");
};
