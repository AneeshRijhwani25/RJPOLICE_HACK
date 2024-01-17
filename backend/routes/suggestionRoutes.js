// suggestionRoutes.js
const express = require('express');
const router = express.Router();
const suggestionController = require('../controllers/suggestionController');

router.post('/create', suggestionController.createSuggestion);
router.get('/police/:policeId', suggestionController.getSuggestionsByPoliceId);

module.exports = router;
