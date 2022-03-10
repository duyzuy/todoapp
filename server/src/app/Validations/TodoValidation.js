const Joi = require('joi');

const validationAddTodo = (data) => {
    const schema = Joi.object({
        title: Joi.string()
            .min(2)
            .max(30)
            .required(),
        completed: Joi.boolean(),
        priority: Joi.string()
            .required(),
    })

  return  schema.validate(data);

}

const validationEditTodo = (data) => {
    const schema = Joi.object({
        title: Joi.string()
            .min(2)
            .max(30)
            .required(),
    })

  return  schema.validate(data);

}
const validationTodoCompleted = (data) =>{
    const schema = Joi.object({

        completed: Joi.boolean(),
    
    })

  return  schema.validate(data);
}


module.exports = {
    validationEditTodo,
    validationAddTodo,
    validationTodoCompleted
}