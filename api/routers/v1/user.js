module.exports = (services, app) => {
  app.get('/users', async (req, res, next) => {
    console.log('SERVICES,', services);
    const users = await services.userService.findAllUsers();
    res.status(200).send({ users });
  });
};
