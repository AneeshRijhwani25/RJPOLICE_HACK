
const Feedbacks = require('../models/FeedbackModel');

const createFeedback = async (feedbackData) => {
    try {
        console.log(feedbackData)
        const feedback = await Feedbacks.create(feedbackData);
        return feedback;
    } catch (error) {
        throw error;
    }
};

const getFeedbacksByPId = (pid) => {
    const list = Feedbacks.find({ PoliceId: pid })
    return list;

}



module.exports = { createFeedback,getFeedbacksByPId };
