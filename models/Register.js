const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { exception } = require('console');

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
        type: String
    },
    tokens: [{
        token:{
            type: String,
            required: true
        }
    }]
})

//Generating Auth tokens
UserSchema.methods.generateAuthToken = async function() {
    try {

        const token = await jwt.sign({ _id: this._id }, "dlkfjslkdjfoewurdfsjkdflkjwljlj", { expiresIn: '1h'});
        this.tokens = this.tokens.concat({token: token});
        await this.save();
        return token;
    } catch(err) {
        throw new exception(err);
    }
}

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
