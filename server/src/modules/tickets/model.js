const knex = require("../../../db/knex");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const generateUniqueId = () => {
  return crypto.randomBytes(10).toString("hex"); // Generates a 20-character alphanumeric string
};

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
    .where("tickets.isActive", 1)
    .whereNotIn("tickets.status", ["Canceled", "Resolved"]); // Exclude tickets with Canceled or Resolved status
};

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
exports.restoreTicket = async (ticketId) => {
  return knex("tickets")
    .update({
      isDeleted: 0,
      isActive: 1,
    })
    .where("id", ticketId);
};
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
      guiId: guiId,
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
      "tickets.guiId",
      "items.name as item_name",
      "tickets.status",
      "tickets.description",
      "tickets.created_at"
    )
    .where("tickets.user_id", userId)
    .andWhere("tickets.isActive", 1)
    .andWhere("tickets.status", "New");
};
exports.updateMyTicket = async (ticketId, userId, status) => {
  // Update the ticket status only if it belongs to the user
  await knex("tickets")
    .where({ id: ticketId, user_id: userId, isDeleted: 0 })
    .update({ status });

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
    )
    .where({ id: ticketId, user_id: userId, isDeleted: 0 })
    .first();

  return updatedTicket;
};
exports.getTicketById = async (ticketId) => {
  return await knex("tickets")
    .join("users", "tickets.user_id", "users.id")
    .select(
      "tickets.guiId",
      "users.username",
      "users.phone",
      "users.email",
      "tickets.status"
    )
    .where("tickets.id", ticketId)
    .first();
};
