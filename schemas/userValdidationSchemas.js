// load Joi module
const Joi = require('joi');

// accepts name only as letters and converts to uppercase
const name = Joi.string().regex(/^[A-Z]+$/).uppercase();

const personDataSchema = Joi.object().keys({
    firstName:  name.required(),
    middleName: name,
    lastName:   name.required(),
    email:      Joi.string().email().lowercase().required(),
    password:   Joi.string().min(7).required(),
    phone:      Joi.string().length(10).pattern(/^[0-9]+$/),
    address1:   Joi.string().max(20),
    address2:   Joi.string().max(20),
    company:    Joi.object({id: Joi.string().hex().length(24)}),
    role:       Joi.string().required(),

});
// // password and confirmPassword must contain the same value
const authDataSchema = Joi.object({
    email:    Joi.string().email().lowercase().required(),
    password: Joi.string().min(7).required(),
});

const registerCompanySchema = Joi.object().keys({
    name:            name.required(),
    socialPlatforms: Joi.array(),
    manager:         Joi.string().required(),
    email:           Joi.string().email().lowercase().required(),
    admins:          Joi.array(),

});

// export the schemas
module.exports = {
    '/register':               personDataSchema,
    '/login':                  authDataSchema,
    '/api/companies/register': registerCompanySchema,
};
