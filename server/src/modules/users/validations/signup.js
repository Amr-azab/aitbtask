const Joi = require("joi");

exports.isValid = (username, phone, email, password) => {
  const userSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    phone: Joi.string()
      .pattern(/^0\d{10}$/) // Ensures phone starts with 0 and has 11 digits
      .required(),
    email: Joi.string().email().min(6).max(45).required(),
    password: Joi.string().min(3).max(20).required(),
  });

  const registerValidResult = userSchema.validate({
    username,
    phone,
    email,
    password,
  });

  return !registerValidResult.error;
};
