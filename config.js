'use strict';
require('dotenv').config();

const NOTE_MONGO_PASSWORD = process.env.NOTE_MONGO_PASSWORD;

module.exports = {
    NOTE_MONGO_PASSWORD,
}
