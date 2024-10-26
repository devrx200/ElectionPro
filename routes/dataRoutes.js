
const express = require('express');
const Data = require('../controllers/dataController');

const router = express.Router();


router.post('/load',Data.load);
router.post('/search',Data.search);
module.exports = router;
