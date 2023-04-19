const mongoose = require('mongoose');
const Schema = mongoose.Schema

let userSchema = new Schema ({
    userName: {type: string},
    Password: {type: string},
    emailAddress: []
});

module.exports = mongoose.model('User', userSchema);