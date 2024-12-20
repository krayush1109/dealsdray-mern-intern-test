// Middleware function to check if the user is authenticated
exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        // If the user is authenticated, proceed to the next middleware or route handler
        return next();
    } else {
        // If the user is not authenticated, redirect to the login page
        // res.send("Login first to access this url")
        res.status(401).json({ message: 'You need to log in first' }); // Respond with an error if not logged in
        // res.redirect("/auth/login");
    }
};
