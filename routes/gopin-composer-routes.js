const express = require('express');
const router = express.Router();
const Composer = require('../models/gopin-composer.js');
const PORT = process.env.PORT || 3000;

/**
 * findAllComposers
 * @openapi
 * /api/composers:
 *   get:
 *     tags:
 *       - Composer
 *     description: API for returning an array of composer objects.
 *     summary: returns an array of composers in JSON format.
 *     responses:
 *       '200':
 *         description: array of composers.
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */
router.get('/gopin-composer', async(req, res)=> {
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

/**
 * findComposerById
 * @openapi
 * /api/composers/{id}:
 *   get:
 *     tags:
 *       - Composers
 *     description:  API for returning a composer document
 *     summary: returns a composer document
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Composer document id
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Composer document
 *       '500':
 *         description: Server exception
 *       '501':
 *         description: MongoDB Exception
 */

router.get('/gopin-composer', async(req, res) => {
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

/**
 * createComposer
 * @openapi
 * /api/composers:
 *   post:
 *     tags:
 *       - Composers
 *     name: createComposer
 *     description: API for adding a new composer document to MongoDB Atlas
 *     summary: Creates a new composer document
 *     requestBody:
 *       description: Composer information
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
 *         description: Composer added
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post('/gopin-composer', async(req, res) => {
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
app.listen(PORT, () => {
    console.log('Application started and listening on PORT' + PORT);
})