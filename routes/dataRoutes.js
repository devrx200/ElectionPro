
const express = require('express');
const Data = require('../controllers/dataController');

const router = express.Router();


router.post('/load',Data.load);

module.exports = router;
