module.exports = (services) => {
  const findAllUsers = async () => {
    try {
      const user = await services.userRepository.findAll({ name: 'qamar' });
      return user;
    } catch (e) {
      console.log('errror', e);
    }
  };

  return {
    findAllUsers,
  };
};
