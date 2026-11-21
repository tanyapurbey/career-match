const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

router.get('/', jobController.getJobs);
router.get('/recommended', jobController.getRecommendedJobs);
router.get('/eligible', jobController.getEligibleJobs);
router.get('/compare', jobController.compareJobs);
router.get('/:id', jobController.getJobById);

module.exports = router;
