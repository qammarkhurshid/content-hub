module.exports = (services, app) => {
    require('./routes/v1/userRoutes')(services, app);
    require('./routes/v1/companyRoutes')(services, app);
};
