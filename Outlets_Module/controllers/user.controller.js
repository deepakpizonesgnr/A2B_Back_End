const { dataFromRequest } = require('../../helpers/basic_helper');
const userService = require('../services/user.service');
const { createResponseObject } = require('../../helpers/basic_helper');
const MESSAGE_CONSTANT = require('../constant');

/**
 * Get paginated list of poll
 *
 * @param req
 * @param res
 *
 * @returns {*}
 */
const index = async (req, res) => {
  // console.log(dataFromRequest(req));
  const results = await userService.index(
    dataFromRequest(req)
  );

  return createResponseObject(
    res,
    MESSAGE_CONSTANT.SUCCESS.INDEX,
    results,
    200
  );
};

/**
 * Send Request To Child
 *
 * @param req
 * @param res
 *
 * @returns {*}
 */
const update = async (req, res) => {
  const result = await userService.update(dataFromRequest(req), req.files, req.user);
  return createResponseObject(res, 'Updated succesfully', result);
};

/**
 * Send Request To Child
 *
 * @param req
 * @param res
 *
 * @returns {*}
 */
const create = async (req, res) => {
  const result = await userService.create(dataFromRequest(req));
  return createResponseObject(res, 'user succesfully registered');
  // return createResponseObject(res, 'user succesfully registered', result);
};

/**
 * Send Request To Child
 *
 * @param req
 * @param res
 *
 * @returns {*}
 */
const createGoogle = async (req, res) => {
  const result = await userService.createGoogle(req.googleData);
  return createResponseObject(res, 'user succesfully registered', result);
};
/**
 * Send Request To Child
 *
 * @param req
 * @param res
 *
 * @returns {*}
 */
const createFacebook = async (req, res) => {
  const result = await userService.createFacebook(req.facebookData);
  return createResponseObject(res, 'user succesfully registered', result);
};


/**
 * loginWithOtp
 *
 * @param req
 * @param res
 *
 * @returns {*}
 */
const forgotPassword = async (req, res) => {
  const results = await userService.forgotPassword(
    dataFromRequest(req),
    req.id
  );

  return createResponseObject(res, MESSAGE_CONSTANT.SUCCESS.FORGOT_PASSWORD,results, 200);
};
const forgotPasswordChange = async (req, res) => {
  const results = await userService.forgotPasswordChange(
    dataFromRequest(req),
    req.id
  );

  return createResponseObject(res, MESSAGE_CONSTANT.SUCCESS.CHANGE_PASSWORD,results, 200);
};
const changePassword = async (req, res) => {
  const results = await userService.changePassword(
    dataFromRequest(req),
    req.user.id
  );

  return createResponseObject(res, MESSAGE_CONSTANT.SUCCESS.CHANGE_PASSWORD,results, 200);
};

const emailVerification = async (req, res) => {
  const results = await userService.emailVerification(
    req.id
  );

  return createResponseObject(res, MESSAGE_CONSTANT.SUCCESS.EMAIL_VERIFICATION, 200);
};


const createTeacher = async (req, res) => {
  const result = await userService.createTeacher(dataFromRequest(req), req.files);
  return createResponseObject(res, 'Teacher succesfully registered');
}


const updateTeacherStatus = async (req, res) => {
  const result = await userService.updateTeacherStatus(dataFromRequest(req));
  return createResponseObject(res, 'Updated Succesfully', result);
}


const updateTeacherInfo = async (req, res) => {
  const result = await userService.updateTeacherInfo(dataFromRequest(req), req.files, req.user.id);
  return createResponseObject(res, 'Updated Succesfully', result);
}

const deleteUser = async (req, res) => {
  const result = await userService.deleteUser(dataFromRequest(req), req.params.id);
  return createResponseObject(res, 'Deletion Updated succesfully', result);
}
const userById = async (req, res) => {
  const result = await userService.userById(req.params.id);
  return createResponseObject(res,  MESSAGE_CONSTANT.SUCCESS.INDEX, result);
}

module.exports = {
  index,
  update,
  create,
  forgotPassword,
  forgotPasswordChange,
  changePassword,
  createGoogle,
  createFacebook,
  emailVerification,
  createTeacher,
  updateTeacherStatus,
  updateTeacherInfo,
  deleteUser,
  userById
};
