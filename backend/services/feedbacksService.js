
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



module.exports = { createFeedback };
