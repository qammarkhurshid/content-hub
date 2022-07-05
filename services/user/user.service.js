const {comparePasswordHashes, createToken} = require('../../common/helpers');
module.exports                = (services) => {
    const findAllUsers = async () => {
        try {
            const user = await services.userRepository.findAll({name: 'qamar'});

            return user;
        } catch (e) {
            console.log('errror', e);
        }
    };

    const registerUser = async (userInfo = {}) => {
        /* For development purposes creating users which are verified by default */
        userInfo.verified = true;
        const user        = await services.userRepository.insertOne(userInfo);

        return user;
    };

    const authenticateUser = async (authCredentials = {}) => {
        const {email, password} = authCredentials;
        const user              = await services.userRepository.findOne({email});
        if (!user) {
            throw new Error('Invalid login credentials');
        }
        const isMatched = await comparePasswordHashes(password, user.password);
        if (!isMatched) {
            throw new Error('Invalid login credentials');
        }
        const token = createToken({
            id:      user._id,
            email:   user.email,
            company: user.company,
            role:    user.role,
        });

        return {
            authToken: token,
            user,
        };
    };

    return {
        findAllUsers,
        registerUser,
        authenticateUser,
    };
};
