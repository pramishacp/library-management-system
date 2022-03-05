const express = require('express');
const router = express.Router();

const Book = require('../services/book');
const validateId = require('../middleware/validateId');

router.get('/', async(req, res) => {
    const books = await Book.findBooks();

    res.status(200).send(books)
})

router.get('/:id', validateId, async(req, res) => {
    const book = await Book.findBookById(req.params.id);

    if (!book) return res.status(404).send('The book with the given ID was not found.');

    res.status(200).send(book)
})

module.exports = router;