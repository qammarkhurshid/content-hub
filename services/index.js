const services = {};
function initServices (app) {
    services.userService       = require('./user/user.service.js')(services);
    services.userRepository    = require('../configs/db.config').userRepository;
    services.companyService    = require('./company/company.service')(services);
    services.companyRepository = require('../configs/db.config').companyRepository;

    // routers
    require('../api/index')(services, app);
}

module.exports = {initServices};
