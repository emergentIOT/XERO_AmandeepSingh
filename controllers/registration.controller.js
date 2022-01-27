const registerUser = require('../models/Register');


async function insert(user) {

    if(!user) {
        return 'No User data';
    }
    const newUser = await new registerUser(user).save();
    return newUser;
}

module.exports = {
    insert
}