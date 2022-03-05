const users = require('./user/index').route;
const borrows = require('./borrow/index').route;
const books = require('./book/index').route;

module.exports = {
    users,
    borrows,
    books
}