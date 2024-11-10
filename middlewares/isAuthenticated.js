const isAuthenticated = (allowedUserTypes = []) => (req, res, next) => {
    if (req.session.user) {
        // Check if the user's type is allowed
        if (!allowedUserTypes.length || allowedUserTypes.includes(req.session.user.user_type)) {
            return next();  // Allow the request to proceed
        }
        // If user type is not allowed, return a 403 Unauthorized error
        // return res.status(403).json({ success: false, msg: "Unauthorized User Type" });
        return res.redirect('/');
    }
    // If user is not authenticated, redirect to the login page
    return res.redirect('/');
};

module.exports = isAuthenticated;
