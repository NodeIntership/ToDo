let Joi = require("joi");
let enums = Object.values(require("../Utils/constants"))

const Schema = Joi.object({
  description: Joi.string().min(1).required(),
  title: Joi.string().alphanum().min(2).max(15),
  status: Joi.string().required().valid(...enums), //todo
  category: Joi.string().hex().length(24),
});

module.exports = Schema;