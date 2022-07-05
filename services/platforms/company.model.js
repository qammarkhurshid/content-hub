const {Schema, model} = require('mongoose');


const platformSchema = new Schema(
    {
        name: {
            type:     String,
            required: [true, 'Platform name is required'],
        },
        url: {
            type:     String,
            required: [true, 'Url is required'],
        },
        apiBaseUrl: {type: String},
    },
    {timestamps: true}
);

const Platform = model('Platform', platformSchema);
module.exports = Platform;
