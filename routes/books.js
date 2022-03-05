const express = require('express');
const router = express.Router();

const Book = require('../services/book');

router.get('/', async(req, res) => {
    const books = await Book.findBooks();

    res.status(200).send(books)
})

module.exports = router;