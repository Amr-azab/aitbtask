const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  // Hash the password from .env
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12);

  // Inserts seed entries
  await knex("users").insert([
    {
      id: uuidv4(),
      username: process.env.ADMIN_USERNAME,
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      phone: process.env.ADMIN_PHONE,
      role: "Admin",
      isActive: 1,
      isDeleted: 0,
    },
  ]);
};
