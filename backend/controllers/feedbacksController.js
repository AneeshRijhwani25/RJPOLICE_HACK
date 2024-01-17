const feedbacksService = require('../services/feedbacksService');
const FIR = require('../models/FirModel');
const Police = require('../models/police');
const User = require('../models/user');

const createFeedback = async (req, res) => {
    try {
        const feedbackData = req.body;
        console.log("body:",req.body)
        console.log(feedbackData)
        const feedback = await feedbacksService.createFeedback(feedbackData);

        const firId = feedbackData.FirId;
        await FIR.findByIdAndUpdate(firId, { $push: { feedbacks: feedback._id } });

        const policeId = feedbackData.PoliceId; 
        await Police.findByIdAndUpdate(policeId, { $push: { feedbacks: feedback._id } });

        const userId = feedbackData.UserId;
        await User.findByIdAndUpdate(userId, { $push: { feedbacks: feedback._id } });

        res.status(201).json({
            status: 'success',
            message: 'Feedback created successfully',
            data: { feedback },
        });
    } catch (error) {
        res.status(400).json({
            status: 'failure',
            message: error.message,
        });
    }
};

module.exports = { createFeedback };
