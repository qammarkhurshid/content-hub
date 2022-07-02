const {Schema, model} = require('mongoose');

const userSchema = new Schema(
    {
        firstName: {
            type:     String,
            required: [true, 'First name is required'],
            validate: {validator: validateNames},
            message:  (props) => `${props.value} is not a valid firstname`,
        },

        middleName: {type: String},
        lastName:   {
            type:     String,
            required: [true, 'Last name is required'],
            validate: {validator: validateNames},
            message:  (props) => `${props.value} is not a valid lastname`,
        },
        email:         {type: String, required: [true, 'Email is required']},
        password:      {type: String, required: [true, 'Password is required']},
        phone:         {type: String, default: ''},
        address1:      {type: String, default: ''},
        address2:      {type: String, default: ''},
        company:       {type: String},
        role:          {type: String},
        verified:      {type: Boolean, default: false},
        deleted:       {type: Boolean, default: false},
        blocked:       {type: Boolean, default: false},
        blockedReason: {type: Number, default: 0},
    },
    {timestamps: true}
);

function validateNames (value) {
    return new RegExp('^[a-zA-Z]+$').test(value);
}

const User     = model('User', userSchema);
module.exports = User;
