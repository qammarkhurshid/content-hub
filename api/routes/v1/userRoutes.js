const SchemaValidator = require('../../../middleware/schemaValidator.js');
const validateRequest = SchemaValidator(true);

module.exports = (services, app) => {
    app.post('/register',
        validateRequest,
        async (req, res) => {
            try {
                const users = await services.userService.registerUser(req.body);
                res.status(200).send({data: users});
            } catch (e) {
                // @TODO: Separate handler for responses
                if (e?.code === 11000) {
                    res.status(400).json({success: false, message: 'Email already exists'});

                    return;
                }
                res.status(400).json({success: false, message: e.message});
            }
        });


    app.post('/login',
        validateRequest,
        async (req, res) => {
            try {
                const userAuth = await services.userService.authenticateUser(req.body);
                res.status(200).send({data: userAuth});
            } catch (e) {
                res.status(400).json({success: false, message: e.message});
            }
        });
};
