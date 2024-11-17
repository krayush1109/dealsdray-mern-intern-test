const session = require('express-session');

const sessionConfig = session({
    secret: PROCESS.env.SESSION_SECRET, // Secret key for session encryption
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set `secure: true` if using HTTPS

});

module.exports = sessionConfig;