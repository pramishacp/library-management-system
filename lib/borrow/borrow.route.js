const express = require('express');
const router = express.Router();

const Borrow = require('./borrow.service');
const Book = require('../book/index').service;

router.post('/', async(req, res) => {
    const borrow = await Borrow.model(req.body);

    await Borrow.insertOneBorrow(borrow)
    await Book.decreaseBookStock(borrow.bookId)

    return res.status(201).send(borrow)
});

module.exports = router;