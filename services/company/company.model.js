const {Schema, model} = require('mongoose');


const companySchema = new Schema(
    {
        name:            {type: String, required: [true, 'Company name is required']},
        socialPlatforms: [{type: Schema.Types.ObjectId, ref: 'Platform', default: []}],
        manager:         {type: Schema.Types.ObjectId, ref: 'User', required: [true, 'Manager is required']},
        admins:          [{type: Schema.Types.ObjectId, ref: 'User', default: []}],
        active:          {type: Boolean, default: false},
        deleted:         {type: Boolean, default: false},
        logo:            {type: String, default: ''},
        apiKey:          {
            iv:           {type: String, default: ''},
            encryptedKey: {type: String, default: ''},
        },
    },
    {timestamps: true}
);

const Company  = model('Company', companySchema);
module.exports = Company;
