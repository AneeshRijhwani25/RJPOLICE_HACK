const mongoose = require('mongoose');

const suggestionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
    policeId: {
        type: String,
        required: true,
    },
});

const Suggestion = mongoose.model('Suggestion', suggestionSchema);

module.exports = Suggestion;
