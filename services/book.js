let books = require('../db/books');

findBooks = () => books

findBookById = (id) => books.find((book) => book.id === id)

insertManyBooks = (books) => books.forEach(book => insertOneBook(book))

insertOneBook = (book) => books.push(book)

removeAllBooks = () => books = [];

module.exports = {
    findBooks,
    findBookById,
    insertOneBook,
    insertManyBooks,
    removeAllBooks
}