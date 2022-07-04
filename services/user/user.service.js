module.exports = (services) => {
    const findAllUsers = async () => {
        try {
            const user = await services.userRepository.findAll({name: 'qamar'});

            return user;
        } catch (e) {
            console.log('errror', e);
        }
    };

    const registerUser = async (userInfo = {}) => {
        /* For development purposes create users which are verified */
        userInfo.verified = true;
        const user        = await services.userRepository.insertOne(userInfo);

        return user;
    };

    return {findAllUsers, registerUser};
};
