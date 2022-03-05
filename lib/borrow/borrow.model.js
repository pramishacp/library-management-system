const Joi = require("joi");
const { v4: uuidv4 } = require('uuid');

class Borrow {
    constructor({ userId, bookId }) {
        this.id = uuidv4();
        this.userId = userId;
        this.bookId = bookId;
    }
}

const validateBorrow = (borrow) => {
    const schema = Joi.object({
        userId: Joi.string()
            .guid({
                version: ['uuidv4', 'uuidv5']
            })
            .required(),
        bookId: Joi.string()
            .guid({
                version: ['uuidv4', 'uuidv5']
            })
            .required()
    });

    return schema.validate(borrow)
}

module.exports.Borrow = Borrow;
module.exports.validate = validateBorrow;