const { v4: uuidv4 } = require('uuid');

class Borrow {
    constructor({ userId, bookId }) {
        this.id = uuidv4();
        this.userId = userId;
        this.bookId = bookId;
    }
}

module.exports.Borrow = Borrow;