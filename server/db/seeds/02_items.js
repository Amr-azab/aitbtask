const { v4: uuidv4 } = require("uuid");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("items").del();

  // Inserts seed entries with UUIDs as IDs
  await knex("items").insert([
    {
      id: uuidv4(),
      name: "Item A",
      price: 19.99,
      description: "Description for Item A",
    },
    {
      id: uuidv4(),
      name: "Item B",
      price: 29.99,
      description: "Description for Item B",
    },
    {
      id: uuidv4(),
      name: "Item C",
      price: 39.99,
      description: "Description for Item C",
    },
  ]);
};
