const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.get('/', studentController.getProfile);
router.put('/', studentController.updateProfile);

router.get('/skills', studentController.getSkills);
router.put('/skills', studentController.updateSkills);

router.get('/preferences', studentController.getPreferences);
router.put('/preferences', studentController.updatePreferences);

module.exports = router;
