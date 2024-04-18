const Joi = require("joi");

const userCreateSchema = Joi.object({
    userName: Joi.string().required(),
    accountNumber: Joi.number().required(),
    emailAddress: Joi.string().email().required(),
    identityNumber: Joi.number().required()
});

const userLoginSchema = Joi.object({
    emailAddress: Joi.string().email().required()
});


module.exports = {
    userCreateSchema,
    userLoginSchema
}