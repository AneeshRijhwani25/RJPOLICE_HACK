const mongoose = require('mongoose');

const FeedSchema = new mongoose.Schema({
    PoliceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Police',
        required: true
    },
    UserId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    FirId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'FIR',
        required: true },
    date: { 
        type: Date, 
        default: Date.now 
    },
    behaviorQuestions: {
        question1: { type: String, required: true },
        question2: { type: String, required: true },
        question3: { type: String, required: true },
    },
    satisfactionLevel: { 
        type: String, 
        required: true 
    },
    rating: { 
        type: Number, 
        required: true 
    },
    suggestions: { type: String },
})

const Feedbacks = mongoose.model("Feedbacks", FeedSchema);

module.exports = Feedbacks;