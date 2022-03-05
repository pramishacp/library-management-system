const express = require('express');

const { borrows, books, users } = require('../lib/index')

module.exports = function(app) {
    app.use(express.json());
    app.use('/api/users', users);
    app.use('/api/books', books);
    app.use('/api/borrows', borrows);
}