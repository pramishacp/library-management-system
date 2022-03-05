const express = require('express');

const users = require('../routes/users');
const books = require('../routes/books');

module.exports = function(app) {
    app.use(express.json());
    app.use('/api/users', users);
    app.use('/api/books', books);
}