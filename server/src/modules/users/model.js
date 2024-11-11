const knex = require("../../../db/knex");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const generateGuiId = require("../../utlis/generateGuiId");
const generateUniqueId = () => {
  return crypto.randomBytes(10).toString("hex"); // Generates a 20-character alphanumeric string
};
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
exports.signIn = async (email, password) => {
  const user = await knex("users")
    .select("id", "username", "email", "password", "role") // Ensure you are selecting the password as well
    .where({ email, isDeleted: 0 })
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
// Admin
// Select all users
exports.selectUsers = async () => {
  return await knex
    .select("id", "username", "email", "role", "isActive", "isDeleted")
    .from("users")
    .where("role", "!=", "Admin"); // Exclude other admins if needed
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

exports.restoreUser = async (id) => {
  return knex("users")
    .update({
      isDeleted: 0,
      isActive: 1,
    })
    .where("id", id);
};
