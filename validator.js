const Joi = require("joi")

const validator = (schema) => (payload) => schema.validate(payload)

const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
})

exports.validateLogin = validator(loginSchema)