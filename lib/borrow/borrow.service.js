let borrows = require('./borrow.db');

findBorrows = () => borrows;

findBorrowsByUserId = (userId) => borrows.filter(borrow => borrow.userId === userId)

insertOneBorrow = (borrow) => borrows.push(borrow)

deleteOneBorrow = (userId, bookId) => {
    let abc = borrows.findIndex((borrow) => borrow.userId === userId && borrow.bookId === bookId)
    return borrows.splice(abc, 1);
}

removeAllBorrows = () => borrows = [];

module.exports = {
    findBorrows,
    findBorrowsByUserId,
    insertOneBorrow,
    deleteOneBorrow,
    removeAllBorrows
}