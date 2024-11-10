const express = require("express");
const itemController = require("./controller");
const { protect } = require("../Authentication/authcontroller");
const upload = require("../utlis/upload");
const { restrictTo } = require("../utlis/roleMiddleware");
const router = express.Router();
router.use(protect);
router.get("/", itemController.getAllItems);
router.post(
  "/additem",
  restrictTo("Admin", "Support"),
  upload.single("photo"),
  itemController.addItem
);
router.patch(
  "/:itemId",
  restrictTo("Admin", "Support"),
  upload.single("photo"),
  itemController.updateItem
);
router.delete(
  "/:itemId",
  restrictTo("Admin", "Support"),
  itemController.deleteItem
);
router.patch(
  "/:itemId/restore",
  restrictTo("Admin"),
  itemController.restoreItem
);
module.exports = router;
