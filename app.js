/** code attribution 
Title: app.js
Author: Zahava Gopin 
Date: 13 March 2023
Description: app.js for web-420
*/
"use strict";

//Requiring the correct paths
const express = require('express');
const http = require('http');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const mongoose = require('mongoose');
const swaggerJSDoc = require('swagger-jsdoc');

const app = express();
const PORT = process.env.PORT || 3000; 

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'WEB 420 RESTful APIs',
            version: '1.0.0',
        },
    },
    apis: ['./routes/*.js'], //files containing annotations for the OpenAPI Specification

};

const openapiSpecificaion = swaggerJSDoc(options);
//Wiring the openapiSpecification variable to app 

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecificaion));

app.listen(PORT, () => {
    console.log('Application started and listening on PORT' + PORT);
})