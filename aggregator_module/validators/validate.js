const Joi = require('joi');

// Aggregator validation schema
const aggregatorSchema = Joi.object({
    AggregatorName: Joi.string().max(255).required(),
    APIKey: Joi.string().max(255).required(),
    SecretKey: Joi.string().max(255).required(),
    EndpointURL: Joi.string().uri().required(),
    Status: Joi.string().valid('active', 'inactive').required(),
    CreatedBy: Joi.string().max(100).required(),
    UpdatedBy: Joi.string().max(100).required(),
});

// Function to validate Aggregator
exports.validateAggregator = (aggregator) => {
    return aggregatorSchema.validate(aggregator);
};