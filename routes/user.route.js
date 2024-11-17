var express = require('express');
const User_Collection = require('../models/user.schema');
var router = express.Router();
const flash = require('connect-flash'); // Import connect-flash

const passport = require('../config/passport-config');
const { isLoggedIn } = require('../middleware/isLoggedIn');
const { handleCreateEmployee, handleUpdateEmployee, handleDeleteEmployee } = require('../controllers/users.controllers');

/* Demo Testing */
router.get('/', isLoggedIn, function (req, res, next) {
  // res.send('respond with a resource');
  res.send('Welcome to the Dashboard ! ');
});

// employee list
router.get('/list', isLoggedIn, (req, res, next) => {
  
  res.send("Employee List");
})

router.get('/create', isLoggedIn, (req, res, next) => {
  
  res.send("Create Employee Page");
})

router.post('/create', handleCreateEmployee);

router.post('/update/:e_id', handleUpdateEmployee);

router.post('/delete/:e_id', handleDeleteEmployee);

module.exports = router;
