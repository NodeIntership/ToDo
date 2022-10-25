let Joi = require("joi");

const Schema = Joi.object({
  title: Joi.string().alphanum().min(2).max(15),
});

module.exports = Schema;
