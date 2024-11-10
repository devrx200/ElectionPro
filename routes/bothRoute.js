// Api Route For Web & Mobile App
const express = require('express');
const All = require('../controllers/bothController');

const router = express.Router();


router.post('/slider',All.loadSlider); // Load All Data 
router.post('/what-ban',All.loadWhatBan); // Load All Data 







// Export 
module.exports = router;
