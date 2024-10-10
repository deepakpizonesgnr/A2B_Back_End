const Joi = require('joi');

const userSchema = Joi.object({
    email: Joi.string()
        .email()
        .max(255)
        .required()
        .messages({
            'string.email': 'Invalid email format',
            'string.max': 'Email must not exceed 255 characters',
            'any.required': 'Email is required'
        }),
    password: Joi.string()
        .min(8)
        .max(255)
        .pattern(/^[a-zA-Z0-9!@#$%^&*()_+={}|[\]\\:";'<>?,./`~]*$/) // Example of allowed characters
        .required()
        .messages({
            'string.min': 'Password must be at least 8 characters long',
            'string.max': 'Password must not exceed 255 characters',
            'string.pattern.base': 'Password must contain only alphanumeric and special characters',
            'any.required': 'Password is required'
        })
});

exports.validateUser = (user) => {
    return userSchema.validate(user);
};