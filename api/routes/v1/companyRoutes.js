const SchemaValidator  = require('../../../middleware/schemaValidator.js');
const validateRequest  = SchemaValidator(true);
const companiesBaseUrl = '/api/companies';

module.exports = (services, app) => {
    app.post(`${companiesBaseUrl}/register`,
        validateRequest,
        async (req, res) => {
            try {
                const registered = await services.companyService.registerCompany(req.body);
                res.status(200).send({data: registered});
            } catch (e) {
                res.status(400).json({success: false, message: e.message});
            }
        });


    app.get(`${companiesBaseUrl}`,
        validateRequest,
        async (req, res) => {
            try {
                const companies = await services.companyService.getAllCompanies(req.body);
                res.status(200).send({data: companies});
            } catch (e) {
                res.status(400).json({success: false, message: e.message});
            }
        });
};
