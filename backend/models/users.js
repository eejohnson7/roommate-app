const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },

    lastName: {
        type: String,
    },

    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    roomies: {
        type: Array,
        required: false,
    },

    preferences: {
        type: Array,
        required: true
    }
});

const User = mongoose.model('users', UserSchema)
module.exports = User;