/**
  Title: gopin-capstone-routes.js
  Author: Zahava Gopin
  Date:  10 May 2023
  Description: API for team routes.
 */
  const express = require('express');
  const router = express.Router();
  const Team = require('./gopin-capstone-model.js');
  const PORT = process.env.PORT || 3000;
  
app.listen(PORT, () => {
    console.log('Application started and listening on PORT' + PORT);
})

/**
 * findAllTeams
 * @openapi
 * /api/teams:
 *   get:
 *     tags:
 *       - Team
 *     description: API for returning an array of team objects.
 *     summary: returns an array of teams in JSON format.
 *     responses:
 *       '200':
 *         description: array of teams.
 *       '500':
 *         description: Server Exception.
 *       '501':
 *         description: MongoDB Exception.
 */
router.get('/api/teams', async(req, res)=> {
    try {
        Team.find({}, function(err, teams) {
            if (err) {
                console.lpg(err);
                res.status(501).send ({
                    'message': `MongoDB Exception: ${err}`
                })
            } else{
                console.log(teams);
                res.json(teams);
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
 * assignPlayerToTeam
 * @openapi
 * /api/teams/:id/players:
 *   post:
 *     tags:
 *       - Teams
 *     name: assignPlayerToTeam
 *     description: API for creating a new document in MongoDB.
 *     summary: Updates a document in MongoDB. 
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: id to assign the player with. 
 *         schema: 
 *           type: string
 *     requestBody:
 *       description: player information
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
 *         description: Player added
 *       '401': 
 *         description: Invalid teamId
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post('/api/teams/:id/players', async(req,res)=> {
    try{
        await Teams.findOne({'id': req.params.id}, 
        function(err, team){
            let newPlayer= {
                id: req.body.id,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                Salary: req.body.Salary
            };

            if (err){
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}` 
                })
            } else{
                team.push(newPlayer);

                team.save(function(err, Team){
                    if(err){
                        console.log(err);
                        res.status(401).send({
                            'message': `Invalid teamId`
                        })
                    }else{
                        console.log(Team);
                        res.json(Team); 
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
 * findAllPayersByTeamId
 * @openapi
 * /api/teams/:id/players:
 *   get:
 *     tags:
 *       - Teams
 *     description:  API for returning a team document
 *     summary: returns a team document
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: returns a team document 
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Player document
 *       '401':
 *          description: Invalid teamId
 *       '500':
 *         description: Server exception
 *       '501':
 *         description: MongoDB Exception
 */
router.get('/api/teams/:id/players', async(req, res)=> {
    try {
        Team.findAll({'id': req.params.id}, function(err, customer){
            if(err){
                console.log(err);
                res.status(500).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else{
                console.log(team);
                res.json(team);
            }
        })
    } catch(e){
        console.log (e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
 });

/**
 * deleteTeamById
 * @openapi
 * /api/teams/:id:
 *   delete:
 *     tags:
 *       - Teams
 *     name: deleteTeamById
 *     description: API for deleting a document from MongoDB by Id.
 *     summary: Removes a document from MongoDB.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Id of the document to remove. 
 *         schema: 
 *           type: string
 *     responses:
 *       '200':
 *         description: Team deleted
 *       '401':
 *          description: Invalid teamId
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.delete('api/teas/:id', async (req, res) => {
    try {
        Team.findByIdAndDelete({'id': req.params.id}, function(err, composer){
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(team);
                res.json(team);
            }
        })
    } catch (e){
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e.message}`
        })
    }
})

module.exports = router