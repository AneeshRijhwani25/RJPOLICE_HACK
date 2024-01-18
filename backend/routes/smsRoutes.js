const express = require('express');
const smscontoler = require('../smstool/page')
const router = express.Router();

router.post('/register', smscontoler.sendFIRRegistrationSMS);
router.post('/resolve', smscontoler.sendFIRResolutionSMS);

module.exports = router;