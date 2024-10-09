const _ = require('underscore');
const { check, param } = require('express-validator');
const userModel = require('../models/user.model');

const index = [];

const update = [
  check('first_name').exists().isString(),
  check('last_name').exists().isString(),
  check('mobile').exists().isString(),
  check('student_type').exists().isString(),
  check('dob').exists().isString(),
  check('email').exists().isString(),
  check("new_profile_image").exists()
];

const forgotPassword = [
  check("email").exists().isString(),
];
const changePassword = [
  check("password").exists().isString(),
  check("newPassword", "Password is required")
    .notEmpty()
    .isLength({
      min: 4,
    })
    .withMessage("Password must contain at least 6 characters")
    .isLength({
      max: 8,
    })
    .withMessage("Password can contain max 20 characters")
    .custom((value, { req }) => {
      if (value === req.body.confirm_password) {
        return true;
      }
      return false;
    })
    .withMessage("Passwords don't match."),
];

const updateStatus = [
  param('id').exists(),
  check("status").exists().isIn(_.values(userModel.USER_STATUS)),
]

const updateTeacherInfo = [
  check('first_name').exists().isString(),
  check('last_name').exists().isString(),
  check('teacher_current_company').exists().isString().optional(),
  check('teacher_title_at_company').exists().isString().optional(),
  check('teacher_location').exists().isString(),
  check('extra_info').exists().isString().optional(),
  check("new_teaching_sample").exists(),
  check("new_teacher_introduction_video").exists(),
  check("new_teacher_resume").exists(),
  check("new_profile_image").exists()

]

const deleteUser =[
  param('id').exists(),
  check("is_deleted").exists().isIn(_.values(userModel.USER_STATUS)),
]
const userById =[
  param('id').exists()
]

const forgotPasswordChange = [
  check("token").exists().isString(),
  check("password").exists().isString(),
  check("confirmPassword", "Password is required")
    .notEmpty()
    .isLength({
      min: 4,
    })
    .withMessage("Password must contain at least 4 characters")
    .isLength({
      max: 8,
    })
    .withMessage("Password can contain max 8 characters")
    .custom((value, { req }) => {
      if (value === req.body.confirmPassword) {
        return true;
      }
      return false;
    })
    .withMessage("Passwords don't match."),
];
const emailVerification = [
  check("token").exists().isString()
];
module.exports = {
  index,
  update,
  forgotPassword,
  changePassword,
  forgotPasswordChange,
  emailVerification,
  updateStatus,
  updateTeacherInfo,
  deleteUser,
  userById
};
