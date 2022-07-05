const {createApiKey} = require('../../common/helpers/index');

module.exports = (services) => {
    const registerCompany = async (companyInfo = {}) => {
        const apiKeys = createApiKey();
        const company = await services.companyRepository.insertOne({
            ...companyInfo,
            apiKey: apiKeys.apiKeyEncrypted,
        });

        return {
            ...company.toObject(),
            apiKey: apiKeys.apiKeyPlain,
        };
    };

    return {registerCompany};
};
