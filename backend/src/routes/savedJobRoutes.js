const express = require('express');
const router = express.Router();
const savedJobController = require('../controllers/savedJobController');

router.get('/', savedJobController.getSavedJobs);
router.post('/:jobId', savedJobController.saveJob);
router.delete('/:jobId', savedJobController.removeSavedJob);

module.exports = router;
