let users = require('./user.db');

insertOneUser = (user) => {
    users.push(user)
    return user;
}

findUserById = (id) => users.find((user) => user.id === id)

removeAllUsers = () => users = [];

module.exports = {
    insertOneUser,
    findUserById,
    removeAllUsers
}