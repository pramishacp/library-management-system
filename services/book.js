let books = require('../db/books');

findBooks = () => books

insertManyBooks = (books) => {
    books.forEach(book => insertOneBook(book))
}

insertOneBook = (book) => {
    books.push(book)
}

removeAllBooks = () => {
    books = [];
}

module.exports = {
    findBooks,
    insertOneBook,
    insertManyBooks,
    removeAllBooks
}