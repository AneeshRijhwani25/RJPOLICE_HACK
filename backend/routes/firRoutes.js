const express = require('express');
const router = express.Router();
const firController = require('../controllers/firController');
const firMiddleware = require('../middleware/firMiddleware');

router.post('/create', firMiddleware.validateFIRInputs, firController.createFIR);


router.get('/:firId', firMiddleware.checkFIRExists, firController.getFIRById);
router.put('/resolve/:firId', firMiddleware.checkFIRExists, firController.resolveFir);


router.get('/pol/:PoliceId', firController.getAllPFIRs);
router.get('/user/:UserId', firController.getAllUFIRs);

module.exports = router;
