var express = require('express');
const User_Collection = require('../models/user.schema');
var router = express.Router();
const flash = require('connect-flash'); // Import connect-flash

const passport = require('../config/passport-config');
const { isLoggedIn } = require('../middleware/isLoggedIn');

/* Demo Testing */
router.get('/', function (req, res, next) {
  // res.send('respond with a resource');
  res.send('Welcome to the Dashboard ! ');
});

router.get('/setting', isLoggedIn, (req, res, next) => {
  
  res.send("Profile Setting Page");
})


module.exports = router;
