const express = require('express');
const router = express.Router();

// Import controller
const grievanceController = require('../controllers/grievanceController');

// Routes
router.get('/', grievanceController.getGrievances);
router.post('/', grievanceController.createGrievance);

module.exports = router;
