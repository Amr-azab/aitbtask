const express = require("express");
const supportController = require("./controller");
const { protect } = require("../Authentication/authcontroller");
const router = express.Router();

router.post("/signin", supportController.signIn);
router.use(protect);
router.get("/tickets", supportController.viewAllTickets);
router.get("/items", supportController.viewAllItems);
router.post("/item", supportController.addItem);
router.patch("/item/:itemId", supportController.updateItem);
router.delete("/item/:itemId", supportController.deleteItem);
router.patch("/ticket/:ticketId", supportController.updateTicket);

module.exports = router;
