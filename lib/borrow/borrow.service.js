const { Borrow } = require('./borrow.model');
let borrows = require('./borrow.db');

findBorrows = () => borrows;

insertOneBorrow = (borrow) => borrows.push(borrow)

removeAllBorrows = () => borrows = [];

model = (body) => new Borrow(body)

module.exports = {
    findBorrows,
    insertOneBorrow,
    removeAllBorrows,
    model
}