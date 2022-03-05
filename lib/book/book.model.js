const { v4: uuidv4 } = require('uuid');

class Book {
    constructor({ name, stock }) {
        this.id = uuidv4();
        this.name = name;
        this.stock = stock;
    }
}

module.exports.Book = Book;