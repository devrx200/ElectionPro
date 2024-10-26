function isLogin(req, res, next) {
    if (req.session && req.session.user) {
        // User is logged in, redirect based on user_type
        const user_type = req.session.user.user_type;

        // Redirect to the correct dashboard based on user_type
        if (user_type === 'admin') {
            return res.redirect('/admin/dashboard');
        } else if (user_type === 'superadmin') {
            return res.redirect('/superadmin/dashboard');
        }
    }
    // If not logged in, proceed to the next middleware (i.e., the login page)
    next();
}

module.exports = isLogin;
