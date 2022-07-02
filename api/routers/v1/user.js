const {verifyToken}     = require('../../../middleware/auth/auth');
const {expressjwt: jwt} = require('express-jwt');

module.exports = (services, app) => {
    app.get('/users',
        async (req, res) => {
            console.log('userssss');
            const users = await services.userService.findAllUsers();
            res.status(200).send({users});
        });
};
