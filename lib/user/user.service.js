let users = require('./user.db');

findUsers = () => users

insertOneUser = (user) => {
    users.push(user)
    return user;
}

findUserById = (id) => users.find((user) => user.id === id)

removeAllUsers = () => users = [];

module.exports = {
    findUsers,
    insertOneUser,
    findUserById,
    removeAllUsers
}