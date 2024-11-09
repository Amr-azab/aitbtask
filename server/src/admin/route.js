const express = require("express");
const adminController = require("./controller");
const { protect } = require("../Authentication/authcontroller");

const router = express.Router();

router.post("/signin", adminController.signIn);
router.use(protect);
router.get("/users", adminController.getAllUsers);
router.delete("/user/:id", adminController.deleteUser);
router.patch("/user/:id/restore", adminController.restoreUser);
router.get("/items", adminController.getAllItems);
router.post("/item", adminController.addItem);
router.patch("/item/:itemId", adminController.updateItem);
router.delete("/item/:itemId", adminController.deleteItem);
router.patch("/item/:itemId/restore", adminController.restoreItem);
router.get("/tickets", adminController.viewTickets);
router.patch("/ticket/:ticketId", adminController.updateTicket);
router.delete("/ticket/:ticketId", adminController.deleteTicket);
router.patch("/ticket/:ticketId/restore", adminController.restoreTicket);
router.post("/signOut", adminController.signOut);

module.exports = router;
