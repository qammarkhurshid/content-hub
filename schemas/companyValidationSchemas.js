/* // load Joi module
const Joi = require('joi');

const name = Joi.string().regex(/^[A-Z]+$/);

const registerCompanySchema = Joi.object().keys({
    name:            name.required(),
    socialPlatforms: Joi.array(),
    manager:         Joi.object({id: Joi.string().hex().length(24)}),
    email:           Joi.string().email().lowercase().required(),
    admins:          Joi.array(),

});

module.exports = {'/api/companies/register': registerCompanySchema};
 */
