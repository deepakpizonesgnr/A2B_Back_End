const _ = require('underscore');
const { check, param,body, oneOf } = require('express-validator');
const userModel = require('../models/user.model');

const storeOrUpdate = [
  check('email').exists().isEmail(),
  check("password").exists().isString(),
  check("confirm_password", "Password is required")
    .notEmpty()
    .isLength({
      min: 4,
    })
    .withMessage("Password must contain at least 4 characters")
    .isLength({
      max: 20,
    })
    .withMessage("Password can contain max 20 characters")
    .custom((value, { req }) => {
      if (value === req.body.password) {
        return true;
      }
      return false;
    })
    .withMessage("Passwords don't match."),
  check('first_name').exists().isString(),
  check('last_name').exists().isString(),
  check('mobile').exists().isString(),
  check('student_type').exists().isString(),
  check('dob').exists().isString(),
];


const storeOrUpdateTeacher = [
  check('first_name').exists().isString(),
  check('email').exists().isEmail(),
  check('last_name').exists().isString(),
  check('teacher_current_company').exists().isString().optional(),
  check('teacher_title_at_company').exists().isString().optional(),
  check('teacher_location').exists().isString(),
  check("password").exists().isString(),
  check("confirm_password", "Password is required")
    .notEmpty()
    .isLength({
      min: 4,
    })
    .withMessage("Password must contain at least 4 characters")
    .isLength({
      max: 20,
    })
    .withMessage("Password can contain max 20 characters")
    .custom((value, { req }) => {
      if (value === req.body.password) {
        return true;
      }
      return false;
    })
    .withMessage("Passwords don't match."),
    check('extra_info').exists().isString().optional(),
];

const login = [
  oneOf(
    [
      check('email').exists().isEmail(),
    ],
    'Login must have either email or phone number, both cannot be empty.'
  ),
  check('password', 'Password is required').notEmpty(),
];

const create = [...storeOrUpdate];
const createTeacher = [...storeOrUpdateTeacher]
const createGoogle= [
  check("idToken").exists().isString(),
];
const createFacebook= [
  check("authToken").exists().isString(),
];

module.exports = {
  create,
  createTeacher,
  login,
  createGoogle,
  createFacebook,
};
