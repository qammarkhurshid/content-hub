require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');

const app = express();

app.use(helmet());

require('./configs/db.config.js').initDb(mongoose, { name: 'mongoose' });
require('./services/index.js').initServices(app);

app.get('/health', (req, res) => {
  res.status(200).json({
    uptime: process.uptime(),
    message: 'Ok',
    date: new Date(),
  });
});

module.exports = {
  app,
};
