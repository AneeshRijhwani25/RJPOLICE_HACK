const FIR = require('../models/FirModel');

const validateFIRInputs = (req, res, next) => {
    const { Title, Description, UserId, PoliceId } = req.body;

    if (!Title || !Description || !UserId || !PoliceId) {
        return res.status(400).json({
            status: 'failure',
            message: 'Missing field data for FIR creation',
        });
    }

    next();
};

const checkFIRExists = async (req, res, next) => {
    const { firId } = req.params;
    console.log(firId)
    try {
        const fir = await FIR.findById(firId);
        if (!fir) {
            return res.status(404).json({
                status: 'failure',
                message: 'FIR not found',
            });
        }
        next();
    } catch (error) {
        res.status(500).json({
            status: 'failure',
            message: 'Internal server error',
        });
    }
};

module.exports = {
    validateFIRInputs,
    checkFIRExists,
};
