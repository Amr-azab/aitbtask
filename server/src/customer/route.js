const express = require("express");
const customerController = require("./constroller");
const { protect } = require("../Authentication/authcontroller");
const router = express.Router();

router.post("/signup", customerController.signUp);
router.post("/signin", customerController.signIn);
router.use(protect);
router.get("/items", customerController.viewItems);
router.post("/ticket", customerController.createTicket);
router.get("/tickets/:userId", customerController.viewMyTickets);
router.post("/signout", customerController.signOut);

module.exports = router;
