const express = require('express');
const policeController = require('../controllers/policeController');

const router = express.Router();

router.post('/register', policeController.register);
router.post('/login', policeController.login);

router.get('/:pin', policeController.PoliceStationbyPin);
router.get('/id/:policeId', policeController.PoliceStationbyId);

router.get('/reqappointments/:policeId', policeController.reqappoint);
router.get('/conappointments/:policeId', policeController.conappoint);


module.exports = router;
