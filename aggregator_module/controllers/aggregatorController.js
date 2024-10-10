const aggregatorService = require('../services/aggregator.service');
const { SUCCESS_MESSAGES, ERROR_MESSAGES } = require('../constant');

// Get all Aggregators
exports.getAllAggregators = async (req, res) => {
    try {
        const aggregators = await aggregatorService.getAllAggregators();
        res.status(200).json(aggregators);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

// Get Aggregator by ID
exports.getAggregatorById = async (req, res) => {
    const { id } = req.params;
    try {
        const aggregator = await aggregatorService.getAggregatorById(id);
        res.status(200).json(aggregator);
    } catch (err) {
        res.status(404).send({ error: err.message });
    }
};

// Create a new Aggregator
exports.createAggregator = async (req, res) => {
    try {
        const id = await aggregatorService.createAggregator(req.body);
        res.status(201).send({ id, message: SUCCESS_MESSAGES.AGGREGATOR_CREATED });
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
};

// Update Aggregator by ID
exports.updateAggregator = async (req, res) => {
    const { id } = req.params;
    try {
        await aggregatorService.updateAggregator(id, req.body);
        res.status(200).send({ message: SUCCESS_MESSAGES.AGGREGATOR_UPDATED });
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
};

// Delete Aggregator by ID
exports.deleteAggregator = async (req, res) => {
    const { id } = req.params;
    try {
        await aggregatorService.deleteAggregator(id);
        res.status(200).send({ message: SUCCESS_MESSAGES.AGGREGATOR_DELETED });
    } catch (err) {
        res.status(404).send({ error: err.message });
    }
};