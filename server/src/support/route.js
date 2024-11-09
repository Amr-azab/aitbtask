const express = require("express");
const supportController = require("./controller");
const { protect } = require("../Authentication/authcontroller");
const upload = require("../utlis/upload");
const router = express.Router();

router.post("/signin", supportController.signIn);
router.use(protect);
router.get("/tickets", supportController.viewAllTickets);
router.get("/items", supportController.viewAllItems);
router.post("/item", upload.single("photo"), supportController.addItem);
router.patch(
  "/item/:itemId",
  upload.single("photo"),
  supportController.updateItem
);
router.delete("/item/:itemId", supportController.deleteItem);
router.patch("/ticket/:ticketId", supportController.updateTicket);
router.post("/signOut", supportController.signOut);

module.exports = router;
