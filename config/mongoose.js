const mongoose = require('mongoose');

const config = require('../config/config');
const mongoUri = config.mongo.uri;

mongoose.connect(mongoUri, { keepAlive: 1, useNewUrlParser: true });

const db = mongoose.connection;

db.once('open', () => {
    console.log(`Connected to db: ${mongoUri} .`)
})

db.on('error', () => {
    throw new Error(console.log(`Unable to connect to database: ${mongoUri} .`));
})

module.exports = db;