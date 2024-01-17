const Suggestion = require('../models/suggestionModel');

const createSuggestion = async (data) => {
    try {
        const suggestion = await Suggestion.create(data);
        return suggestion;
    } catch (error) {
        throw error;
    }
};

const getSuggestionsByPoliceId = async (policeId) => {
    try {
        const suggestions = await Suggestion.find({ policeId }).sort({ dateCreated: 'desc' });
        return suggestions;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createSuggestion,
    getSuggestionsByPoliceId,
};
