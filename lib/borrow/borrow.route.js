const express = require('express');
const router = express.Router();

const { validate, BorrowModel } = require('./borrow.model');
const Borrow = require('./borrow.service');
const Book = require('../book/index').service;
const User = require('../user/index').service;

router.post('/', async(req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = User.findUserById(req.body.userId);
    if (!user) return res.status(404).send('The user with the given ID was not found.');

    let book = Book.findBookById(req.body.bookId);
    if (!book) return res.status(404).send('The book with the given ID was not found.');

    let borrows = Borrow.findBorrowsByUserId(req.body.userId);
    if (borrows.length >= 2) return res.status(403).send('The borrowing limit of 2 exceeded.');

    let isBorrowed = borrows.some(borrow => borrow.bookId === req.body.bookId);
    if (isBorrowed) return res.status(403).send('The user already borrowed selected book.');

    if (!book.stock) return res.status(403).send('The book is not in stock.');

    const borrow = new BorrowModel(req.body);

    await Borrow.insertOneBorrow(borrow);
    await Book.decreaseBookStock(borrow.bookId);

    return res.status(201).send(borrow);
});

router.put('/', async(req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = User.findUserById(req.body.userId);
    if (!user) return res.status(404).send('The user with the given ID was not found.');

    let book = Book.findBookById(req.body.bookId);
    if (!book) return res.status(404).send('The book with the given ID was not found.');

    let borrows = Borrow.findBorrowsByUserId(req.body.userId);
    if (!borrows.length) return res.status(403).send('No book borrowed yet.');

    await Borrow.deleteOneBorrow(req.body.userId, req.body.bookId);
    await Book.increaseBookStock(req.body.bookId);

    return res.status(204).send()
});

module.exports = router;