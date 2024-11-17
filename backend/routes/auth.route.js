const express = require('express');
const session = require('express-session');
const passport = require('../config/passport-config');
const User = require('../models/user.schema');
const router = express.Router();
const flash = require('connect-flash'); // Import connect-flash
const { isLoggedIn } = require('../middleware/isLoggedIn');

const getNextSerialNumber = require('../utils/getNextSerialNumber');

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.error('Login Error:', err);
            return res.status(500).json({ message: 'Internal server error' });
        }

        if (!user) {
            console.log('Authentication failed:', info.message);
            return res.status(401).json({ message: info.message || 'Authentication failed' });
        }

        req.logIn(user, (err) => {
            if (err) {
                console.error('Error logging in user:', err);
                return res.status(500).json({ message: 'Login error' });
            }

            // Successful login
            return res.status(200).json({
                message: 'Login successful',
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
            });
        });
    })(req, res, next);
});

router.get('/status', (req, res) => {
    console.log('Session:', req.session);
    console.log('User  ---:', req.user);


    if (req.isAuthenticated()) {
        res.status(200).json({ isLoggedIn: true, user: req.user });
    } else {
        res.status(401).json({ isLoggedIn: false, message: 'Not authenticated' });
    }
});


// Route to handle user logout
router.post('/logout', (req, res, next) => {  // Change to POST
    if (!req.isAuthenticated()) {
        // If the user is not authenticated, respond with an error message
        return res.status(400).send('You are not logged in');
    }

    // Proceed with logging out
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.send('Logout Successfully'); // Send success message
    });
});

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