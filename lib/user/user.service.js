let users = require('./user.db');

findUsers = () => users

insertManyUsers = (users) => users.forEach(user => insertOneUser(user))

insertOneUser = (user) => users.push(user)

findUserById = (id) => users.find((user) => user.id === id)

removeAllUsers = () => users = [];

module.exports = {
    findUsers,
    insertOneUser,
    insertManyUsers,
    findUserById,
    removeAllUsers
}