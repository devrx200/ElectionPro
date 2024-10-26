
const express = require('express');
const Auth = require('../controllers/authController');
const router = express.Router();

// Login endpoint
router.post('/login',Auth.login);
// Logout endpoint
router.post('/logout',Auth.logout);

module.exports = router;
