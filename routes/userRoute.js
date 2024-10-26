
const express = require('express');
const Profile = require('../controllers/profileController');
const router = express.Router();

// Profile Endpoint
router.post('/profile',Profile.loadUserProfile);

module.exports = router;
