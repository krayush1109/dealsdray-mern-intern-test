var express = require('express');
const User_Collection = require('../models/user.schema');
var router = express.Router();
const flash = require('connect-flash'); // Import connect-flash

const passport = require('../config/passport-config');
const { isLoggedIn } = require('../middleware/isLoggedIn');
const { handleCreateEmployee, handleUpdateEmployee, handleDeleteEmployee, handleGetAllEmployee } = require('../controllers/users.controllers');
const Employee_Collection = require('../models/employee.schema');

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

router.get('/getAllEmployee', handleGetAllEmployee)

router.post('/create', handleCreateEmployee);

router.get('/update/:e_id', async (req, res, next) => {
  try {
    const { e_id } = req.params;

    const employee = await Employee_Collection.findOne({ e_id });
    console.log("Specific Employee : ", employee);

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({ message: "Specific Employee Fetched.", employee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});


router.post('/update/:e_id', handleUpdateEmployee);

router.get('/delete/:e_id', handleDeleteEmployee);
router.post('/demo', (req, res, next) => {
  res.status(200).json({ message: "Demo Test Passed" });
})
module.exports = router;
