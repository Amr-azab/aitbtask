const Joi = require("joi");

exports.isValidItem = (name, price, description, photo) => {
  // Define the Joi schema for item validation
  const itemSchema = Joi.object({
    name: Joi.string().max(45).required(),
    price: Joi.number().positive().precision(2).required(),
  });

  // Validate the provided data against the schema
  const itemValidationResult = itemSchema.validate({
    name,
    price,
  });

  // Check if validation returned an error
  if (itemValidationResult.error) {
    return false; // Validation failed
  }
  return true; // Validation succeeded
};
