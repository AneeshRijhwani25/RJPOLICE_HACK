const firService = require('../services/firService');
const policeService = require('../services/policeService')
const userService = require('../services/authService')
const createFIR = async (req, res) => {
    try {
        const { Title, Description, UserId, PoliceId } = req.body;
        const data = { Title, Description, UserId, PoliceId };

        const fir = await firService.createFIR(data);

        await userService.addFIRToUser(UserId, fir._id);
        
        await policeService.addFIRToPolice(PoliceId, fir._id);

        res.status(201).json({
            status: 'success',
            message: 'FIR created successfully',
            data: { fir },
        });
    } catch (error) {
        res.status(400).json({
            status: 'failure',
            message: error.message,
        });
    }
};


const getFIRById = async (req, res) => {
    try {
        const { firId } = req.params;
        const fir = await firService.getFIRById(firId);
        res.status(200).json({
            status: 'success',
            data: { fir },
        });
    } catch (error) {
        res.status(404).json({
            status: 'failure',
            message: error.message,
        });
    }
};

const getAllPFIRs = async (req, res) => {
    
    try {
        const {PoliceId} = req.params
        console.log(PoliceId)
        const firList = await firService.getFIRByPId(PoliceId);
        res.status(200).json({
            status: 'success',
            data: { firList },
        });
    } catch (error) {
        res.status(500).json({
            status: 'failure',
            message: 'Internal server error',
        });
    }
};
const getAllUFIRs = async (req, res) => {
    
    try {
        const {UserId} = req.params
        const firList = await firService.getFIRByUId(UserId);
        res.status(200).json({
            status: 'success',
            data: { firList },
        });
    } catch (error) {
        res.status(500).json({
            status: 'failure',
            message: 'Internal server error',
        });
    }
};

const resolveFir = async(req,res) =>{
    try{
    const { firId } = req.params;
    console.log(firId)
    // const fir = await firService.getFIRById(firId);

    const updatedFir = await firService.updateFirStatus({ firId, status: 'resolved' });

    
    res.status(200).json({ message: 'fir resolved successfully', data: updatedFir });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}


module.exports = {
    createFIR,
    getFIRById,
    getAllPFIRs,
    getAllUFIRs,
    resolveFir
};
