const express = require('express');
const cors = require('cors');
const morgan = require('morgan')

const { borrows, books, users } = require('../lib/index')

module.exports = function(app) {
    app.use(express.json());
    app.use(cors())
    app.use(morgan('tiny'))
    app.use('/api/users', users);
    app.use('/api/books', books);
    app.use('/api/borrows', borrows);
}