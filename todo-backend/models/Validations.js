const Joi = require("joi");

const registerValidation = (data) => {
  const registerSchema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  return registerSchema.validate(data);
};

module.exports.registerValidation = registerValidation;
