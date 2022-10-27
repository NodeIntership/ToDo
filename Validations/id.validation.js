let Joi = require("joi");

const Schema = Joi.string().hex().length(24);

module.exports = Schema;
