require('dotenv').config();
const express  = require('express');
const mongoose = require('mongoose');
const helmet   = require('helmet');
const logger   = require('morgan');

const app               = express();
const {expressjwt: jwt} = require('express-jwt');

const {JWT_SECRET} = process.env;
app.use(helmet());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(logger('dev'));
app.use('/api', jwt({secret: JWT_SECRET, algorithms: ['HS256']}));
require('./configs/db.config.js').initDb(mongoose, {name: 'mongoose'});
require('./services/index.js').initServices(app);

app.get('/health', (req, res) => {
    res.status(200).json({
        uptime:  process.uptime(),
        message: 'Ok',
        date:    new Date(),
    });
});
app.use(function onError (err, req, res, _next) {
    res.status(500).send(JSON.stringify(err));
});

module.exports = {app};
