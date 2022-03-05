const express = require('express');
const router = express.Router();

const Book = require('../services/book');

router.get('/', async(req, res) => {
    const books = await Book.findBooks();

    res.status(200).send(books)
})

router.get('/:id', async(req, res) => {
    const book = await Book.findBookById(req.params.id);

    res.status(200).send(book)
})

module.exports = router;