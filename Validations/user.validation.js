let Joi = require("joi");

const Schema = Joi.object({
  name: Joi.string().alphanum().min(2).max(20).required(),
  surname: Joi.string().alphanum().min(2).max(20),
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  birthday: Joi.date().min("1940-1-1").iso(),
  profession: Joi.string().hex().length(24).required(),
  professionHidden: Joi.boolean()
});

module.exports = Schema;