const express = require('express');
const session = require('express-session');
const passport = require('../config/passport-config');
const User = require('../models/user.schema');
const router = express.Router();
const flash = require('connect-flash'); // Import connect-flash
const { isLoggedIn } = require('../middleware/isLoggedIn');

const getNextSerialNumber = require('../utils/getNextSerialNumber');

// Route to handle login with Passport.js authentication
router.post('/login', passport.authenticate('local', {
    successRedirect: '/user/', // Redirect on successful login
    failureRedirect: '/auth/login',    // Redirect on failed login
    failureFlash: true            // Enable flash messages for failures
}));

// Route to handle user logout
router.get('/logout', (req, res) => {
    if (!req.isAuthenticated()) {
        // If the user is not authenticated, respond with an error message
        return res.status(400).send('You are not logged in');
    }

    // Proceed with logging out
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        // res.redirect('/auth/login')
        res.send('Logout Successfully');

    });
});

router.get('/demo', (req, res, next) => {
    res.send("Demo");
})

router.post('/register', async (req, res, next) => {    
    try {
        const { username, email, password } = req.body;
        const encryptedDetail = password;

        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' }); // Send 400 error for duplicate email
        }

        // new user registration
        const new_user = {
            f_sno: await getNextSerialNumber(),
            username,
            email,            
        }

        await User.register(new User(new_user), encryptedDetail);
        res.status(200).json({ message: 'Registration successful' });
        // res.redirect("/login");
    } catch (err) {
        console.error("Error: ", err);
        res.send(err.message);
    }
})

module.exports = router;