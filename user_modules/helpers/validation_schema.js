const { body, validationResult } = require('express-validator');
exports.validateUser = (req, res, next) => {
  // Validate ShopCode
  body('email').isString().notEmpty().isEmail().withMessage('email is required')(req, res, next);
  
  // Validate Region
  body('password').isString().notEmpty().isLength({ min: 4 }).withMessage('password is required')(req, res, next);

  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }

  // Proceed to the next middleware or route handler
  next();
};


exports.forgetPassword = (req, res, next) => {
  body('email').isString().notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format')(req, res, next);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }

  next();
};
exports.verificationOtp = (req, res, next) => {
  body('otp').isString().notEmpty().withMessage('OTP is required').isLength({ min: 6, max: 6 }).withMessage('OTP must be 6 digits long').matches(/^\d{6}$/).withMessage('OTP must be numeric')(req, res, next);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }

  next();
};
exports.resetPassword = (req, res, next) => {
  body('password').isString()
  .notEmpty()
  .withMessage('Password is required')
  .isLength({ min: 8 }) // Minimum length of 8 characters
  .withMessage('Password must be at least 8 characters long')
  .matches(/[A-Z]/)
  .withMessage('Password must contain at least one uppercase letter')
  .matches(/[a-z]/)
  .withMessage('Password must contain at least one lowercase letter')
  .matches(/[0-9]/)
  .withMessage('Password must contain at least one number')
  .matches(/[\W_]/)
  .withMessage('Password must contain at least one special character')(req, res, next);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }

  next();
};