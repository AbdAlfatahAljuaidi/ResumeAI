const resumeController = require('../controllers/resumeController');
const express = require('express');
const router = express.Router();

router.delete('/delete-resume/:userID/:resumeId', resumeController.deleteResume);
router.put('/resume/:userID/:resumeTitle', resumeController.updateResume);

module.exports = router;