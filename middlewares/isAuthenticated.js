
const isAuthenticated = (user_type = []) => {
    return (req, res, next) => {
        if (req.session.user) {
            // Check if the user has a user_type that is allowed
            const user_type = req.session.user.user_type;
            // If user_types are specified, check if the user's user_type is in the allowed user_types
            if (user_type.length && !user_type.includes(user_type)) {
                return res.status(403).redirect('/').json({ success: 'false',msg:"Unauthorized User Type", error: error.message });;
            }
            return next();
     
        } else {
            // User is not authenticated, redirect to the login page
            return res.redirect('/');
        }
    };
};
module.exports = isAuthenticated;

   