const FIR = require('../models/FirModel');

const createFIR = async (data) => {
    try {
        const fir = await FIR.create(data);
        return fir;
    } catch (error) {
        throw error;
    }
};

const getFIRById = async (firId) => {
    try {
        const fir = await FIR.findById(firId);
        return fir;
    } catch (error) {
        throw error;
    }
};
const getFIRByPId = async (PoliceId) => {
    try {
        const fir = await FIR.find({
            PoliceId: PoliceId
        });
        return fir;
    } catch (error) {
        throw error;
    }
};
const getFIRByUId = async (UserId) => {
    try {
        const fir = await FIR.find({
            UserId: UserId
        });
        return fir;
    } catch (error) {
        throw error;
    }
};

const getAllFIRs = async () => {
    try {
        const allFirs = await FIR.find({});
        return allFirs;
    } catch (error) {
        console.log("Error in getting all FIRs");
        throw error;
    }

};

const updateFirStatus = async ({firId,status}) =>{
    try {
        const _id = firId;
        const updatedfir = await FIR.findByIdAndUpdate(
            _id,
            { Status: status },
            { new: true } 
        );
            console.log(updatedfir)
        if (!updatedfir) {
            throw new NotFoundError('The fir does not exist');
        }

        return updatedfir;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createFIR,
    getFIRById,
    getAllFIRs,
    getFIRByPId,
    getFIRByUId,
    updateFirStatus
};
