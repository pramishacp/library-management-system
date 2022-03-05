const { Borrow } = require('./borrow.model');
let borrows = require('./borrow.db');

findBorrows = () => borrows;

findBorrowsByUserId = (userId) => borrows.filter(borrow => borrow.userId === userId)

insertOneBorrow = (borrow) => borrows.push(borrow)

removeAllBorrows = () => borrows = [];

model = (body) => new Borrow(body)

module.exports = {
    findBorrows,
    findBorrowsByUserId,
    insertOneBorrow,
    removeAllBorrows,
    model
}