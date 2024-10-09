const { body, validationResult } = require('express-validator');

exports.forgetPassword = [
    body('email').isString().notEmpty().withMessage('ShopCode is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
  ];