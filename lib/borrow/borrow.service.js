let borrows = require('./borrow.db');
const Book = require('../book/index').service;

findBorrows = () => borrows;

findBorrowsByUserId = (userId) => borrows.filter(borrow => borrow.userId === userId).map(borrow => ({ ...borrow, bookName: Book.findBookById(borrow.bookId).name }))

insertOneBorrow = (borrow) => borrows.push(borrow)

deleteOneBorrow = (userId, bookId) => {
    let start = borrows.findIndex((borrow) => borrow.userId === userId && borrow.bookId === bookId)
    return borrows.splice(start, 1);
}

removeAllBorrows = () => borrows = [];

module.exports = {
    findBorrows,
    findBorrowsByUserId,
    insertOneBorrow,
    deleteOneBorrow,
    removeAllBorrows
}