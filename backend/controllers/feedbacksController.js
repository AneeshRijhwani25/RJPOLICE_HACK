const feedbacksService = require('../services/feedbacksService');
const FIR = require('../models/FirModel');
const Police = require('../models/police');
const User = require('../models/user');

const createFeedback = async (req, res) => {
    try {
        const feedbackData = req.body;
        const feedback = await feedbacksService.createFeedback(feedbackData);
        console.log(feedback)
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

const getFeedbackByPId = async (req, res) => {
    let pid = req.params.policeId;
    try {
        const feedbackList = await feedbacksService.getFeedbacksByPId(pid);
        if (!feedbackList) {
            throw new Error('No Feedback found')
        }
        return res.status(200).json({
            status: 'success',
            message: 'Feedback list by PID fetched Successfully',
            feedbackList
        })
    } catch (err) {
        return res.status(400).json({
            status: 'failure',
            message: err.message
        })
    }
};


module.exports = { createFeedback, getFeedbackByPId };
