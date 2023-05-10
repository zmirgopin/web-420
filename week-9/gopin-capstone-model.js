/**
	Title: gopin-capstone-model.js
    Author: Zahava Gopin
    Date: 10 May 2023
    Description: MongoDB Shell model for Team collection.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema

let playerSchema = new Schema({
    firstName: {type: string},
    lastName: {type: string},
    salary: {type: Number}
});

let teamSchema = new Schema ({
    name: {type: string},
    mascot: {type: string},
    players: [playerSchema]
})

module.exports = mongoose.model('Team', teamSchema);