
const express = require('express');
const SupAdmin = require('../controllers/superadminController');
const router = express.Router();

//
router.post('/users-list',SupAdmin.usersList);


module.exports = router;
