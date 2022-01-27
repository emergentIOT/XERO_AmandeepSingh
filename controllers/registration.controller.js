const registerUser = require('../models/Register');


async function insert(user) {

    const newUser = await new registerUser(user).save();
    return newUser;
}

module.exports = {
    insert
}