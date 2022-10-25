let Joi = require("joi");

const Schema = Joi.object({
  id: Joi.string().hex().length(24),
});

module.exports = Schema;
