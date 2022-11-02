let queryValidator = require("../Validations/todo.query.validation");

function validateQuery(req, res, next) {
  let result = queryValidator.validate(req.query);

  if (result.error) {
    res.json({ message: result.error.details[0].message });
    return;
  }
  next();
}

module.exports = validateQuery;
