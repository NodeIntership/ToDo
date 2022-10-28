let Joi = require("joi");

const Schema = Joi.object({
  name: Joi.string().alphanum().min(2).max(20).required(),
  surname: Joi.string().alphanum().min(2).max(20),
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  birthday: Joi.date().min("1950-1-1").iso(),
});

module.exports = Schema;