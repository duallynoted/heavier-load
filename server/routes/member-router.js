const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//this query will make a call to the server to get member information
router.get('/', (req, res) => {
    pool.query(`SELECT * FROM "person"
    ORDER BY "id";`)
        .then((results) => {
            res.send(results.rows);
        }).catch((error) => {   
            res.sendStatus(500);
            console.log('error getting member', error);
        });//end GET pool query
});//end GET call server side

//this query will update a member's profile information	
router.put('/:id', (req, res) => {
    let id = req.user.id; //passport is sending the id of the member to update, so it is "user" instead of "params"
    let body = req.body;
    const queryValues = [body.first_name, body.last_name, body.height, body.weight, body.gender, body.goal, id]
    pool.query(`UPDATE "person" 
    SET "first_name"=$1,"last_name"=$2,"height"=$3,"weight"=$4,"gender"=$5,"goal"=$6
    WHERE "id" = $7;`, queryValues)
    .then(() => {
        res.sendStatus(200);
    }).catch(error => {
        console.log('error updating member', error);
        res.sendStatus(500);
    });//end PUT pool query 
});//end PUT call server side

//this query will make post calls from member-generated data, creating exercises to track weight-load over time
router.post('/:id', (req, res) => {
    let person_id= req.user.id;
    const newExercise= req.body;
    const queryValues = [newExercise.title, newExercise.weight_load, newExercise.day, person_id];
    console.log('ADD METHOD',newExercise);      
    pool.query(`INSERT INTO "custom_exercise" ("title","weight_load","day","person_id")
    VALUES ($1,$2,$3,$4);`, queryValues)
        .then((results) => {
            console.log('NEWEXERCISE: ', results);
            res.send(results.rows);            
        }).catch((error) => {
            console.log('Error POSTING exercise to PostgreSQL', error);
            res.sendStatus(500);
        })//end POST pool query
});//end POST call server side

module.exports = router;