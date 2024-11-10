const ticketModel = require("./model");
const AppError = require("../utlis/appError");
const catchAsync = require("../utlis/catchAsync");
const jwt = require("jsonwebtoken");
const generateToken = require("../utlis/generateToken");
exports.viewTickets = catchAsync(async (req, res, next) => {
  const tickets = await ticketModel.viewTickets();
  res.status(200).json(tickets);
});
exports.updateTicket = catchAsync(async (req, res, next) => {
  const { ticketId } = req.params;
  const { status, description } = req.body;

  const updatedTicket = await ticketModel.updateTicket(ticketId, {
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
      guiId: updatedTicket.guiId,
      status: updatedTicket.status,
      description: updatedTicket.description,
      userId: updatedTicket.user_id, // Corrected field name
      itemId: updatedTicket.item_id, // Corrected field name
      createdAt: updatedTicket.created_at, // Corrected field name
    },
  });
});
exports.deleteTicket = catchAsync(async (req, res, next) => {
  const { ticketId } = req.params;

  // Check if the ticket exists and if it is active
  const ticket = await ticketModel.selectTicketById(ticketId);

  if (!ticket || ticket.isActive === 0) {
    return next(new AppError("Ticket not found", 404)); // Ticket not found or already deleted
  }

  // Proceed with soft delete (mark as deleted)
  await ticketModel.deleteTicket(ticketId);

  res.status(200).json({ message: "Ticket deleted successfully" });
});
exports.restoreTicket = catchAsync(async (req, res, next) => {
  const { ticketId } = req.params;

  // Check if the ticket exists and if it is deleted
  const ticket = await ticketModel.selectTicketById(ticketId);

  // if (!ticket || ticket.isDeleted === 0) {
  //   return next(new AppError("Ticket not found or already restored", 404)); // Ticket not found or already restored
  // }

  // Proceed with restoring the ticket (set isDeleted to 0 and isActive to 1)
  await ticketModel.restoreTicket(ticketId);

  res.status(200).json({ message: "Ticket restored successfully" });
});
exports.createTicket = catchAsync(async (req, res, next) => {
  const { itemId, description } = req.body;

  const ticketId = await ticketModel.createTicket(
    req.user.id,
    itemId,
    description
  );
  res.status(201).json({ message: "Ticket created successfully", ticketId });
});
exports.viewMyTickets = catchAsync(async (req, res, next) => {
  // const { userId } = req.params;

  const tickets = await ticketModel.viewMyTickets(req.user.id);
  res.status(200).json(tickets);
});
