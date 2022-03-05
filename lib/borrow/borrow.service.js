let borrows = require('./borrow.db');

findBorrows = () => borrows;

findBorrowsByUserId = (userId) => borrows.filter(borrow => borrow.userId === userId)

insertOneBorrow = (borrow) => borrows.push(borrow)

removeAllBorrows = () => borrows = [];

module.exports = {
    findBorrows,
    findBorrowsByUserId,
    insertOneBorrow,
    removeAllBorrows
}