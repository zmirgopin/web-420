/**
	Title: gopin-customer.js
    Author: Zahava Gopin
    Date: 24 April 2023
    Description: MongoDB Shell model for Customer collection.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema

let lineItemSchema =  new Schema ({
    name: {type: string},
    price: {type: Number},
    quantity: {type: Number}
});
//invoice schema uses lineItem schema
let invoiceSchema= new Schema({
    subtotal: {type: Number},
    tax: {type: Number},
    dateCreated: {type: string},
    dateShipped: {type: string},
    lineItems: [lineItemSchema]
});
//customer schema uses invoice schema
let customerSchema = new Schema({
    firstName: {type: string},
    lastName: {type: string},
    userName: {type: string},
    invoices: [invoiceSchema]
});
//exporting the Customer Schema
module.exports = mongoose.model('Customer', customerSchema);
