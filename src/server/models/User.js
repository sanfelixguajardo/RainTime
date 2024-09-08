const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    refreshToken : [String] // we make this an array so that multiple devices can be logged in at the same time
});

module.exports = mongoose.model('User', userSchema);