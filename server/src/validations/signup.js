const joi = require("joi");

exports.isValid = (username, phone, email, password) => {
  userSchema = joi.object({
    username: joi.string().min(3).max(45).required(),
    phone: joi.string().max(11).required(),
    email: joi.string().email().min(6).max(45).required(),
    password: joi.string().min(3).max(20).required(),
  });

  const registerValidResult = userSchema.validate({
    username,
    phone,
    email,
    password,
  });

  if (registerValidResult.error) {
    return false;
  }
  return true;
};
