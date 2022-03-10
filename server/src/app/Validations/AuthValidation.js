const Joi = require('joi');

const registerValidation = (data) => {
    const schema = Joi.object({
        firstName: Joi.string()
            .min(2)
            .max(30)
            .required(),
        lastName: Joi.string()
            .min(3)
            .max(30)
            .required(),
        username: Joi.string()
            .min(3)
            .max(30)
            .required(),
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    
        phone: Joi.number()
    })

  return  schema.validate(data);

}

const logInValidation = (data) => {
    const schema = Joi.object({
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    })

    return  schema.validate(data);
}

module.exports = {
    logInValidation,
    registerValidation
}