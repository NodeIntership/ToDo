let Joi = require("joi");
let enums = Object.values(require("../Utils/constants"));

const todoUpdateValidationSchema = Joi.object({
  description: Joi.string().min(1),
  title: Joi.string().alphanum().min(2).max(15),
  status: Joi.string().valid(...enums),
  category: Joi.string().hex().length(24),
  userId: Joi.string().hex().length(24),
});

const categoryUpdateValidationSchema = Joi.object({
  title: Joi.string().min(2).max(15),
});

module.exports = {
  todoUpdateValidationSchema,
  categoryUpdateValidationSchema,
};
