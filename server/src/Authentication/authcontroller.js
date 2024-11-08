const AppError = require("../utlis/appError"); // Import your AppError class
const catchAsync = require("../utlis/catchAsync"); // Import your catchAsync wrapper
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const knex = require("../../db/knex");

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  ) {
    return next(new AppError("login first", 401));
  }
  token = req.headers.authorization.split(" ")[1];
  let decoded;
  try {
    decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  } catch (err) {
    return next(new AppError("invaild token", 401));
  }
  const existedUser = await knex("users")
    .select("id", "username", "email", "role")
    .where({ id: decoded.id, isDeleted: 0 })
    .first();

  if (!existedUser) {
    return next(new AppError("User no longer exists", 404));
  }

  req.user = existedUser;
  next();
});
