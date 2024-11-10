const express = require("express");
const ticketController = require("./controller");
const { protect } = require("../Authentication/authcontroller");
const { restrictTo } = require("../utlis/roleMiddleware");
const router = express.Router();
router.use(protect);
router.post("/create-ticket", ticketController.createTicket);
router.get("/:userId", ticketController.viewMyTickets);
router.get(
  "/alltickets",
  restrictTo("Admin", "Support"),
  ticketController.viewTickets
);
router.patch(
  "/:ticketId",
  restrictTo("Admin", "Support"),
  ticketController.updateTicket
);
router.delete("/:ticketId", restrictTo("Admin"), ticketController.deleteTicket);
router.patch(
  "/:ticketId/restore",
  restrictTo("Admin"),
  ticketController.restoreTicket
);
module.exports = router;
