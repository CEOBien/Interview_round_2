const Joi = require("joi");


const taskValidate = (data) => {
  const schema = Joi.object({
    id: Joi.number(),
    name_task: Joi.string().max(255).required().label("name_task"),
    desc: Joi.string().label("desc"),
    start_time: Joi.date().label("start_time"),
    end_time: Joi.date().label("end_time"),
    status_task: Joi.string().label("status_task"),
  });

  return schema.validate(data);
};

module.exports = {
  taskValidate
};
