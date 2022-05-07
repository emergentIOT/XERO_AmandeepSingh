const registerUser = require('../models/Register');


exports.insert = async function(user) {

    if(!user) {
        return 'No User data';
    }
    const newUser = await new registerUser(user).save();
    return newUser;
}
