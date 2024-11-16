var express = require('express');
const User_Collection = require('../models/user.schema');
var router = express.Router();

// controllers
const { handleRegistration } = require('../controllers/users.controllers');

// Import middleware for authentication check
const { isLoggedIn } = require('../middleware/isLoggedIn');

// ------------ passport routes ------------ 
const passport = require('passport');
const LocalStrategy = require('passport-local');

// Configure passport to use the local strategy for authentication
passport.use(new LocalStrategy(User_Collection.authenticate()));
// ------------ passport routes ------------ 

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', handleRegistration)

router.post('/login', (req, res, next) => {
  try {
    res.send("Login Sucessfully");
  } catch (err) {
    console.log(err)
    res.send("ERROR: ", err);
  }
})



module.exports = router;
