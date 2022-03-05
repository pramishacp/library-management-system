const Joi = require('joi');
const { v4: uuidv4 } = require('uuid');

class User {
    constructor({ name }) {
        this.id = uuidv4();
        this.name = name;
    }
}

module.exports.User = User;
