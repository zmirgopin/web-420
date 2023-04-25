/**
	Title: gopin-node-shopper-routes.js
    Author: Zahava Gopin
    Date: 24 April 2023
    Description: MongoDB Shell routes for Customer collection.
 */
const express = require('express');
const router = express.Router();
const Person = require('../models/gopin-customer.js');
/**
 * createCustomer
 * @openapi
 * /api/customers:
 *   post:
 *     tags:
 *       - Customers
 *     name: createCustomer
 *     description: API for adding a new customer document to MongoDB   Atlas
 *     summary: Creates a new customer document
 *     requestBody:
 *       description: customer information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - type
 *             properties:
 *               type:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Customer added
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post('/api/customers', async(req, res) => {
    try {
        const newCustomer = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName 
        };

        await Customer.create(newCustomer, function(err, person) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(person);
                res.json(person);
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
});

/**
 * createInvoiceByUserName
 * @openapi
 * /api/customers/:username/invoices:
 *   post:
 *     tags:
 *       - Customers
 *     name: createInvoiceByUserName
 *     description: API for creating a new document in MongoDB.
 *     summary: Updates a document in MongoDB. 
 *     parameters:
 *       - name: userName
 *         in: path
 *         required: true
 *         description: username to create the collection with. 
 *         schema: 
 *           type: string
 *     requestBody:
 *       description: Customer information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - type
 *             properties:
 *               type:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Customer added
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
 router.post('/api/customers/:username/invoices', async(req,res)=> {
    try{
        await Customer.findOne({'userName': req.params.userName}, 
        function(err, customer){
            let newInvoice= {
                subtotal: req.body.subtotal,
                tax: req.body.tax,
                dateCreated: req.body.dateCreated,
                dateShipped: req.body.dateShipped,
                lineItems: req.body.lineItems
            };

            if (err){
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}` 
                })
            } else{
                customer.push(newInvoice);

                customer.save(function(err, Customer){
                    if(err){
                        console.log(err);
                    }else{
                        console.log(Customer);
                        res.json(Customer); 
                    }
                })
            }
        })

        
    }catch(e){
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
 });
/**
 * findAllInvoicesByUserName
 * @openapi
 * /api/customers/:username/invoices:
 *   get:
 *     tags:
 *       - Customers
 *     description:  API for returning a invoice document
 *     summary: returns a invoice document
 *     parameters:
 *       - name: username
 *         in: path
 *         required: true
 *         description: Customer document username
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Invoice document
 *       '500':
 *         description: Server exception
 *       '501':
 *         description: MongoDB Exception
 */
 router.get('/api/customers/:username/invoices', async(req, res)=> {
    try {
        Customer.findAll({'userName': req.params.userName}, function(err, customer){
            if(err){
                console.log(err);
                res.status(500).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else{
                console.log(customer);
                res.json(customer);
            }
        })
    } catch(e){
        console.log (e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
 });