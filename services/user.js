const users  = require('../db/users');

createUser = (user) => {
    users.push(user)
    return user;
}

findUserById = (id) => users.find((user)=> user.id ===id)

module.exports = {
    createUser,
    findUserById
}