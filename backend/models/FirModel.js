const mongoose = require('mongoose');
const FirSchema = new mongoose.Schema({
    Title: { type: String, required: true },
    Description: { type: String, required: true },
    Date: { type: Date, default: Date.now() },
    Status: {
        type: String, 
        enum: ['Open', 'Closed'], 
        default: "Open"
    },
    UserId: {
        type: String,
        required: true,
    },
    PoliceId: {
        type: String,
        required: true,
    },
    feedbacks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Feedbacks",
        default: [],
    }]
})

const FIR = mongoose.model("FIR", FirSchema);

module.exports = FIR;