const services = {};
function initServices (app) {
    services.userRepository = require('../configs/db.config').userRepository;
    services.userService    = require('./user/user.service.js')(services);

    // routers
    require('../api/index')(services, app);
}

module.exports = {initServices};
