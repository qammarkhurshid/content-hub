const SchemaValidator = require('../../../middleware/schemaValidator.js');
const validateRequest = SchemaValidator(true);

module.exports = (services, app) => {
    app.get('/users',
        async (req, res) => {
            console.log('PATH', req.path);
            const users = await services.userService.findAllUsers();
            res.status(200).send({users});
        });

    app.post('/register',
        validateRequest,
        async (req, res) => {
            try {
                const users = await services.userService.registerUser(req.body);
                res.status(200).send({users});
            } catch (e) {
                if (e?.code === 11000) {
                    res.status(400).json({success: false, message: 'Email already exists'});
                }
            }
        });
};
