module.exports = (services, app) => {
  require('./routers/v1/user')(services, app);
};
