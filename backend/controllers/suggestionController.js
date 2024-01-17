
const suggestionService = require('../services/suggestionService');

const createSuggestion = async (req, res) => {
    try {
        const { title, description, policeId } = req.body;
        const data = { title, description, policeId };

        const suggestion = await suggestionService.createSuggestion(data);

        res.status(201).json({
            status: 'success',
            message: 'Suggestion created successfully',
            data: { suggestion },
        });
    } catch (error) {
        res.status(400).json({
            status: 'failure',
            message: error.message,
        });
    }
};

const getSuggestionsByPoliceId = async (req, res) => {
    try {
        const { policeId } = req.params;

        const suggestions = await suggestionService.getSuggestionsByPoliceId(policeId);

        res.status(200).json({
            status: 'success',
            data: { suggestions },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    createSuggestion,
    getSuggestionsByPoliceId,
};
