const express = require("express");
const customerRoutes = require("./src/customer/route");
const adminRoutes = require("./src/admin/route");
const supportRoutes = require("./src/support/route");
const userRoutes = require("./src/users/route");
const itemRoutes = require("./src/items/route");
const ticketRoutes = require("./src/tickets/route");
const globalErrorHandler = require("./src/utlis/errorController");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const morgan = require("morgan");
// const dotenv = require("dotenv");
const app = express();
app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
  })
); // connection front with back while diffrenet domain
// dotenv.config({ path: "./config.env" });
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// app.use("/api/admin", adminRoutes);
// app.use("/api/support", supportRoutes);
// app.use("/api/customer", customerRoutes);
app.use("/api/aitb/user", userRoutes);
app.use("/api/aitb/items", itemRoutes);
app.use("/api/aitb/ticket", ticketRoutes);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find this url on the server`, 400));
});
app.use(globalErrorHandler);
module.exports = app;
