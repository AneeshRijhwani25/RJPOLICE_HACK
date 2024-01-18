
const Feedbacks = require('../models/FeedbackModel');

const createFeedback = async (feedbackData) => {
    try {
        let newFeedback = await Feedbacks.create(feedbackData);
        return newFeedback;
        
    } catch (error) {
        throw error;
    }
};

const getFeedbacksByPId = (pid) => {
    const list = Feedbacks.find({ PoliceId: pid })
    return list;

}



module.exports = { createFeedback,getFeedbacksByPId };
