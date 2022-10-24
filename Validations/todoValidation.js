let Joi = require("joi");

const Schema = Joi.object({
  description: Joi.string().min(1).required(),
  title: Joi.string().alphanum().min(2).max(15),
  status: Joi.string().pattern(/(^PENDING$|^COMPLETED$)/).required(),
  categoryId: Joi.string(),
});

module.exports = Schema;