const express = require('express');
const router = express.Router();
const feedbacksController = require('../controllers/feedbacksController');

router.post('/create', feedbacksController.createFeedback);
router.get('/:policeId', feedbacksController.getFeedbackByPId);

module.exports = router;
