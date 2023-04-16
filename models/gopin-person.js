/**
	Title: gopin-person.js
    Author: Zahava Gopin
    Date: 15 April 2023
    Description: MongoDB Shell queries for users collection.
 */
const mongoose = require('mongoose');
const { schema } = require('./composer');
const Schema = mongoose.Schema

//creating the role schema
let roleSchema = new Schema ({
    text: {type: string}
});

//creating the dependent schema
let dependentSchema = new Schema ({
    firstName: {type: string},
    lastName: {type: string}
});

//creating the person schema (includes the role and dependent schema) to be exported 
let personSchema = new Schema ({
    firstName: {type: string},
    lastName: {type: string},
    roles: [roleSchema],
    dependents: [dependentSchema],
    birthDate: {type: string}
});

module.exports = mongoose.model('Person', personSchema);