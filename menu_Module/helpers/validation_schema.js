const { body, validationResult } = require('express-validator');
exports.validateUser = [
  body('ShopCode').isString().notEmpty().withMessage('ShopCode is required'),
  body('Region').isString().notEmpty().withMessage('Resgion is required'),
  (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
      }
      next();
  }
];
