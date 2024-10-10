const aggregatorModel = require('../models/aggregator.model');
const { validateAggregator } = require('../validators/validate');
const { AGGREGATOR_STATUS, ERROR_MESSAGES } = require('../constant');

// Service to create an aggregator
exports.createAggregator = async (aggregator) => {
    const { error } = validateAggregator(aggregator);
    if (error) {
        throw new Error(error.details[0].message);
    }
    return new Promise((resolve, reject) => {
        aggregatorModel.createAggregator(aggregator, (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result.insertId);
            }
        });
    });
};

// Service to get all aggregators
exports.getAllAggregators = async () => {
    return new Promise((resolve, reject) => {
        aggregatorModel.getAllAggregators((err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

// Service to get aggregator by ID
exports.getAggregatorById = async (id) => {
    return new Promise((resolve, reject) => {
        aggregatorModel.getAggregatorById(id, (err, result) => {
            if (err) {
                reject(err);
            } else if (result.length === 0) {
                reject(new Error('Aggregator not found'));
            } else {
                resolve(result[0]);
            }
        });
    });
};

// Service to update an aggregator
exports.updateAggregator = async (id, aggregator) => {
    const { error } = validateAggregator(aggregator);
    if (error) {
        throw new Error(error.details[0].message);
    }
    return new Promise((resolve, reject) => {
        aggregatorModel.updateAggregator(id, aggregator, (err, result) => {
            if (err) {
                reject(err);
            } else if (result.affectedRows === 0) {
                reject(new Error('Aggregator not found'));
            } else {
                resolve();
            }
        });
    });
};

// Service to delete an aggregator
exports.deleteAggregator = async (id) => {
    return new Promise((resolve, reject) => {
        aggregatorModel.deleteAggregator(id, (err, result) => {
            if (err) {
                reject(err);
            } else if (result.affectedRows === 0) {
                reject(new Error('Aggregator not found'));
            } else {
                resolve();
            }
        });
    });
};