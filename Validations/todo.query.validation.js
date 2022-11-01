let Joi = require("joi");
let enums = Object.values(require("../Utils/constants"));

const Schema = Joi.object({
  status: Joi.string().valid(...enums),
  category: Joi.string().hex().length(24),
  userId: Joi.string().hex().length(24),
});

module.exports = Schema;
