const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

router.post('/create', appointmentController.createAppointment);
router.put('/confirm', appointmentController.confirmAppointment);


router.get('/id/:id', appointmentController.appointbyid);

router.get('/:userId', appointmentController.appointbyUser);
router.get('/pol/:policeId', appointmentController.appointbyPolice);




module.exports = router;
