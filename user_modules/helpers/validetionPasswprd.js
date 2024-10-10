const Joi = require('joi');

// Aggregator validation schema
const userSchema = Joi.object({
    email: Joi.string().max(255).required(),
  password:Joi.string().max(255).required(),

});

exports.validateUser = (user) => {
    return userSchema.validate(user);
};