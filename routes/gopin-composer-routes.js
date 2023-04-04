const express = require('express');
const router = express.Router();
const Composer = require('../models/gopin-composer');

router.get('/api/composers', async(req, res)=> {
    try {
        Composer.find({}, function(err, composers) {
            if (err) {
                console.lpg(err);
                res.status(501).send ({
                    'message': `MongoDB Exception: ${err}`
                })
            } else{
                console.log(composers);
                res.json(composers);
                res.status(200).send ({
                })
            }
        })
    }catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
})

router.get('/api/composers/:id', async(req, res) => {
    try {
        Composer.findOne({'_id': req.params.id}, function(err, composer) {
            if (err) {
                console.log(err);
                res.status(500).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(composer);
                res.json(composer);
                res.status(200).send({})
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
})

router.post('/api/composers', async(req, res) => {
    try {
        const composer= {
            firstName: req.body.firstName,
            lastName: req.body.lastName
        }

        await Composer.create(composer, function(err, composer) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(composer);
                res.json(composer);
                res.status(200).send({})
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
})