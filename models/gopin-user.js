/**
  Title: gopin-user.js
  Author: Zahava Gopin
  Date: 19 April 2023
  Description: Model for API for session routes.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema

let userSchema = new Schema ({
    userName: {type: string},
    Password: {type: string},
    emailAddress: []
});

module.exports = mongoose.model('User', userSchema);