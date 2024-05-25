const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    role: {
        type: Number,
        default: 0, // 0 - for regular user <<WHILE>> 1 - for admin
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        maxLength: 255
    }
});



module.exports = mongoose.model('User', UserSchema);