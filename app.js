require('dotenv').config();
const express           = require('express');
const mongoose          = require('mongoose');
const helmet            = require('helmet');
const app               = express();
const {expressjwt: jwt} = require('express-jwt');

const {JWT_SECRET} = process.env;
app.use(helmet());
app.use('/users', jwt({secret: JWT_SECRET, algorithms: ['HS256']}));
require('./configs/db.config.js').initDb(mongoose, {name: 'mongoose'});
require('./services/index.js').initServices(app);

app.get('/health', (req, res) => {
    res.status(200).json({
        uptime:  process.uptime(),
        message: 'Ok',
        date:    new Date(),
    });
});

module.exports = {app};
