const express = require("express");
const ticketController = require("./controller");
const { protect } = require("../../Authentication/authcontroller");
const { restrictTo } = require("../../utlis/roleMiddleware");
const router = express.Router();
router.use(protect);
router.post("/create-ticket/:itemId", ticketController.createTicket);
router.get("/mytickets/:userId", ticketController.viewMyTickets);
router.patch("/update-my-ticket/:ticketId", ticketController.updateMyTicket);
router.get(
  "/alltickets",
  restrictTo("Admin", "Support"),
  ticketController.viewTickets
);
router.patch(
  "/:ticketId/update-tickets",
  restrictTo("Admin", "Support"),
  ticketController.updateTicket
);
router.delete(
  "/delete-ticket/:ticketId",
  restrictTo("Admin"),
  ticketController.deleteTicket
);
router.patch(
  "/:ticketId/restore-tickets",
  restrictTo("Admin"),
  ticketController.restoreTicket
);
router.get(
  "/request-ticket/:ticketId",
  restrictTo("Admin", "Support"),
  ticketController.viewSingleTicket
);

module.exports = router;
