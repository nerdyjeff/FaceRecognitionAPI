const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

 const db = knex({
    client: 'pg',
    connection: {
      connectionString : 'process.env.DATABASE_URL',
      ssl: true,
    }
  });

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/',(req, res) => {
    res.send(database.users);
});

//and update the login table in the database
app.post('/signin', (req,res) => { signin.handleSignin(req,res,db,bcrypt)})

// Calling the function register.js to get a new user and store it in database
//And injecting the dependencies the function needs to run
app.post('/register',(req, res) => {register.handleRegister(req, res, db, bcrypt)})

//Route to get/return a user's profile
app.get('/profile/:id',(req,res) => {profile.handleProfileGet(req, res, db)})

//Updating the user entry and increase their count
app.post('/imageurl',(req,res) => { image.handleApiCall(req,res,db)})





app.listen(3000, ()=> {
    console.log('server is running');
})