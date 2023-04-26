/**
	Title: gopin-session-routes.js
  Author: Zahava Gopin
  Date: 19 April 2023
  Description: API for session routes.
 */
const express = require("express");
const router = express.Router();
const User = require("../models/gopin-user.js");
const bcrypt = require("bcryptjs");

let saltRounds = 10;

/**
 * signUp
 * @openapi
 * /api/register:
 *   post:
 *     tags:
 *       - Passwords
 *     name: register
 *     summary: Register password
 *     requestBody:
 *       description: Password information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Password added to MongoDB
 *       '401':
 *          description: Username is already in use
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.post("/api/signup", async (req, res) => {
  try {
    Username.findOne({ userName: req.body.userName }, function (err, user) {
      if (!user) {
        const hashedPassword = bcrypt.hashSync(req.body.Password, saltRounds);
        const newRegisteredUser = {
          userName: req.body.userName,
          Password: hashedPassword,
          emailAddress: req.body.emailAddress,
        };

        User.create(newRegisteredUser, function (err, user) {
          if (user) {
            console.log(err);
            res.status(401).send({
              message: `Username is already in use: ${err}`,
            });
          } else {
            console.log(user);
            res.json(user);
          }
        });
      } else {
        console.log(e);
        res.status(501).send({
          message: `MongoDB Exception: ${err}`,
        });
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: `Server Excpetion: ${e.message}`,
    });
  }
});

/**
 * login
 * @openapi
 * /api/login:
 *   post:
 *     tags:
 *       - Passwords
 *     name: login
 *  *     summary: logs in user
 *     requestBody:
 *       description: login information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - userName
 *               - Password
 *             properties:
 *               userName:
 *                 type: string
 *               Password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Password added to MongoDB
 *       '401':
 *         description: Invalid userName or Password
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
*/
router.post('/api/login', async(req, res) => {
    try {
        Username.findOne({'userName': req.body.userName}, function(err, user) {
            if (!user) {
                console.log(user);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(user);
                if (user) {
                    let passwordIsValid = bcrypt.compareSync(req.body.Password, user.Password);

                    if (user) {
                        console.log('User logged in');
                        res.status(200).send({
                            'message': 'User logged in'
                        })
                    } else {
                        console.log('Invalid username and/or password');
                        res.status(401).send({
                            'message': `Invalid username and/or password`
                        })
                    }
                } else {
                    console.log('Invalid passId');
                    res.status(401).send({
                        'message': `Invalid username and/or password`
                    })
                }
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e}`
        })
    }
})

module.exports = router;