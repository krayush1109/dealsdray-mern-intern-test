var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', (req, res, next) => {
  try {
    res.send("Registered Sucessfully");
  } catch (err) {
    console.log(err)
    res.send("ERROR: ", err);
  }
})

router.post('/login', (req, res, next) => {
  try {
    res.send("Login Sucessfully");
  } catch (err) {
    console.log(err)
    res.send("ERROR: ", err);
  }
})



module.exports = router;
