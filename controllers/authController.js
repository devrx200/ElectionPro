require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const {logUserActivity} = require('../configs/helper');

// Login function for User
const login = async (req, res) => {
  const { identifier, password, rememberMe } = req.body;
  try {
    const results = await User.findByIdentifier(identifier);
    if (results.length === 0) {
      return res.status(401).json({
        success: "false",
        message: "Invalid Username/Email",
      });
    }
    // All Data Load On User Variable 
    const user = results[0];

    // Compare the provided password with the stored hash
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      // Log the failed login attempt with the user_id
      const ipAddress = req.connection.remoteAddress || req.ip;
      const userAgent = req.headers['user-agent'];
      await logUserActivity(user.user_id,user.username,user.user_type, new Date(), ipAddress, userAgent, 'failed');
      return res.status(401).json({
        success: "false",
        message: "Invalid Password Please Correct...",
      });
    }

    // Create and send the JWT
    const token = jwt.sign(
      {
        user_id: user.user_id,
        full_name: user.full_name,
        user_type: user.user_type,
        username: user.username,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: rememberMe ? "30d" : "1h" }
    );

    // Set session expiration dynamically based on "Remember Me"
    req.session.cookie.maxAge = rememberMe
      ? 30 * 24 * 60 * 60 * 1000
      : 60 * 60 * 1000; // 30 days or 1 hour

    const sessionExpiry = rememberMe
      ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      : new Date(Date.now() + 1 * 60 * 60 * 1000); // Set expiration time based on rememberMe
    req.session.cookie.expires = sessionExpiry;

    // Store user info in session
    req.session.user = {
      user_id: user.user_id,
      full_name: user.full_name, 
      user_type: user.user_type,
      username: user.username,
      email: user.email,
    };

    // Capture user details for logging
    const ipAddress = req.connection.remoteAddress || req.ip;
    const userAgent = req.headers['user-agent'];
    const loginTime = new Date();

    // Log the successful login
    await logUserActivity(user.user_id,user.username, user.user_type, loginTime, ipAddress, userAgent, 'success');

    // Respond with success message and user details
    return res.status(200).json({
      success: "true",
      message: "Login Successfully",
      user: {
        full_name: user.full_name,
        user_id: user.user_id,
        username: user.username,
        email: user.email,
        user_type: user.user_type,
      },
      token: token,
      sessionExpiryIn: sessionExpiry,
    });
  } catch (error) {
    // Log the failed login attempt if an error occurs
    const ipAddress = req.connection.remoteAddress || req.ip;
    const userAgent = req.headers['user-agent'];
    await logUserActivity(null, null, new Date(), ipAddress, userAgent, 'failed');

    return res.status(500).json({ success: "false", error: error.message });
  }
};

// Logout Function
const logout = (req, res) => {
  const userType = req.session.user ? req.session.user.user_type : null; // Get user user_type from session
  const username = req.session.user ? req.session.user.username : null; // Get username from session
  let redirectUrl = '/'; // Default redirect URL

  // Try to destroy the session and clear the cookie
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      return res.status(500).json({
        success: "false",
        message: "Logout failed. Please try again later.",
      });
    }

    // Clear the session cookie if it exists
    res.clearCookie('connect.sid'); // Use your session cookie name if different

    // Set the redirect URL based on the user user_type
    if (userType === "admin") {
      redirectUrl = "/admin/login"; // Adjust to the actual admin login page
    } else if (userType === "superadmin") {
      redirectUrl = "/superadmin/login"; // Adjust to the actual superadmin login page
    } else if (userType === "user") {
      redirectUrl = "/user/dashboard"; // Adjust to the actual user dashboard
    }

    res.status(200).json({
      success: "true",
      message: "Logout successful.",
      redirect: redirectUrl, // Indicate where to redirect based on user_type
      user_type: userType, // Include user user_type in response
      username: username, // Include username in response
    });
  });
};

// Export Function
module.exports = { login, logout };
