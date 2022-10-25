let Joi = require("joi");

const Schema = Joi.object({
  description: Joi.string().min(1).required(),
  title: Joi.string().alphanum().min(2).max(15),
  status: Joi.string().required(),//todo 
  categoryId: Joi.string(),
});

module.exports = Schema;