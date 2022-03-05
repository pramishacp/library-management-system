let books = require('./book.db');

findBooks = () => books

findBookById = (id) => books.find((book) => book.id === id)

insertManyBooks = (books) => books.forEach(book => insertOneBook(book))

insertOneBook = (book) => books.push(book)

removeAllBooks = () => books = [];

decreaseBookStock = (bookId) => books.map(book => book.id == bookId ? {...book, stock: book.stock-- } : book);

module.exports = {
    findBooks,
    findBookById,
    insertOneBook,
    insertManyBooks,
    removeAllBooks,
    decreaseBookStock
}