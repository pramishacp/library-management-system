const { Borrow } = require('./borrow.model');
let borrows = require('./borrow.db');

insertOneBorrow = (borrow) => borrows.push(borrow)

removeAllBorrows = () => borrows = [];

model = (body) => new Borrow(body)

module.exports = {
    insertOneBorrow,
    removeAllBorrows,
    model
}