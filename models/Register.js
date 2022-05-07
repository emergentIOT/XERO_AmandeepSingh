const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    }
})

//Will call before saving Register object in db.
UserSchema.pre("save", async function(next){

    //Will only hash if its created first time or modified.
    if(this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
        this.confirmPassword = undefined;
    }
    next();
})

module.exports = mongoose.model('User', UserSchema);
