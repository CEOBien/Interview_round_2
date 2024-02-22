const createError = require("http-errors");
const {
 
  taskValidate
} = require("../validations/validation");


module.exports.validTask = (req, res, next) => {
  const { error } = taskValidate(req.body);
  if (error) {
    throw createError.BadRequest(error.details[0].message);
  }
  next();
};
