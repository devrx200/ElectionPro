
const express = require('express');
const Data = require('../controllers/dataController');

const router = express.Router();


router.post('/load',Data.load); // Load All Data 
router.post('/search',Data.search);  //Search All Column on 
router.post('/loadvidhansabha',Data.loadVidhanSabha);  //Vidhansabha All Column List
router.post('/vidhansabha',Data.vidhansabha);  // All Data Acording AC_No List
router.post('/part',Data.part);  // All Data Acording PART_NO List
router.post('/loadpart',Data.loadpartData);  // All Data Acording PART_NO List
router.post('/partlist',Data.partList);  // All Data Acording PART_NO List
router.post('/vstatus',Data.VStatus);  //Update Voted Or Not 
router.post('/update',Data.updateVInfo);  // Update Voter Info 






// Export 
module.exports = router;
