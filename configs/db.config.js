const UserModel    = require('../services/user/user.model');
const CompanyModel = require('../services/company/company.model');
async function initDb (orm, opts) {
    const {name}                = opts;
    const {HOST, PORT, DB_NAME} = process.env;
    const connectionParams      = {
        host:   HOST,
        port:   PORT,
        dbName: DB_NAME,
    };
    let connection              = '';
    switch (name) {
        case 'mongoose':
            try {
                connection = await connectToMongoDb(orm, connectionParams);
                console.log('===MONGODB CONNECTION ESTABLISHED===');
            } catch (error) {
                console.log('ERROR ESTABLISHING CONNECTION, WILL TRY TO RECONNECT', error);
                await connectToMongoDb(orm, connectionParams);
            }
            break;

        default:
            break;
    }
}

async function connectToMongoDb (orm, connectionParams) {
    const {host, port, dbName} = connectionParams;

    return orm.connect(`mongodb://${host}:${port}/${dbName}`);
}

module.exports = {
    initDb,
    userRepository:    require('../services/user/user.repo')(UserModel),
    companyRepository: require('../services/company/company.repo')(CompanyModel),
};
