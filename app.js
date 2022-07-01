require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const User = require('./services/user.service/user.model');

require('./services/user.service/user.repo')(User);

const app = express();

app.use(helmet());

require('./configs/db.config.js').initDb(mongoose, { name: 'mongoose' });

module.exports = {
  app,
};
