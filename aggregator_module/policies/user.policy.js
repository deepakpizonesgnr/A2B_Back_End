const _ = require('underscore');
const createError = require('http-errors');
const userModel = require('../models/user.model');
const { dataFromRequest } = require('../../helpers/basic_helper');
const { querys } = require('../../helpers/queryMySql.helpers');
const {
  verifyRefreshTokenForgotPasswordC,
} = require('../helpers/jwt_helper');

/**
 * Index
 *
 * @param req
 * @param res
 * @param next
 *
 */
const index = async (req, res, next) => {
  // const data = dataFromRequest(req);  
  if (req.user.role !== '1') {
    return next(
      createError(404, `You don't have permission to update the status.`)
    );
  }
  return next();
};

/**
 * Update Status
 *
 * @param req
 * @param res
 * @param next
 *
 */
const updateStatus = async (req, res, next ) => {
  const data = dataFromRequest(req);
  const teacher = await querys('select * from user where id=?', [data.id]);
    if (_.isEmpty(teacher)) {
      return next(createError(400, `User with ${data.id} is not exist`));
    }
    if (teacher[0].status == data.status) {
    return next(createError(404, `You have already set the same status.`));
  }

  if (req.user.role !== '1') {
    return next(
      createError(404, `You don't have permission to update the status.`)
    );
  }
  return next();
}


const updateTeacherInfo = async (req, res, next) => {
  try {
    const data = dataFromRequest(req);
    if (req.body.new_teacher_introduction_video == 'true' && !req.files.teacher_introduction_video) {
      return next(
        createError(404, `New Introduction is Invalid value`)
      );
    }
    if(req.body.new_teaching_sample == 'true' && !req.files.teaching_sample) {
      return next(
        createError(404, `New Teaching Sample is Invalid value`)
      );
    }
    if (req.body.new_teacher_resume == 'true' && !req.files.teacher_resume) {
      return next(
        createError(404, `Resume value is Invalid value`)
      );
    }
    if(req.body.new_profile_image == 'true' && !req.files.profile_image){
      return next(
        createError(404, `Teacher Image value is Invalid value`)
      );
    }

    if (req.user.role !== '1' && req.user.role !== '2') {
      return next(
        createError(404, `You don't have permission to update the status.`)
      );
    }
    return next();
  } catch (error) {
    return next(createError(400, `Please Check Values`));
  }
}

/**
 * Update
 *
 * @param req
 * @param res
 * @param next
 *
 */
const update = async (req, res, next) => {
  if (req.body.new_profile_image == 'true' && !req.files.profile_image) {
    return next(
      createError(404, `User Image value is Invalid value`)
    );
  }
  return next();
};

/**
 * Update
 *
 * @param req
 * @param res
 * @param next
 *
 */
const forgotPassword = async (req, res, next) => {
  const data = dataFromRequest(req);

  const user = await querys('select * from user where email=?', [data.email]);
    if (_.isEmpty(user)) {
      return next(createError(400, `User with ${data.email} is not exist`));
    }
  req.id = user[0].id;
  return next();
};

const changePassword = async (req, res, next) => {
  const data = dataFromRequest(req);
  const user = await userModel.findOne({ email: req.user.email });
  const isMatch = await user.isValidPassword(data.password);
  if (!isMatch){
    return next(
      createError(
        400,
        `password not valid`
      )
    );
  }
  req.user = user;
  return next();
};

const forgotPasswordChange = async (req, res, next) => {
  const { token } = req.body;
  if (!token) throw createError.BadRequest();
  const userId = await verifyRefreshTokenForgotPasswordC(token);
  req.id = userId ;
  return next();
};

const emailVerification = async (req, res, next) => {
  const { token } = req.body;
  if (!token) throw createError.BadRequest();
  const userId = await verifyRefreshTokenForgotPasswordC(token);
  req.id = userId ;
  return next();
};

const deleteUser =  async (req, res, next) => {
  const data = dataFromRequest(req);
  const teacher = await querys('select * from user where id=?', [req.params.id]);
    if (_.isEmpty(teacher)) {
      return next(createError(400, `User with ${req.params.id} is not exist`));
    }
    if (teacher[0].is_deleted == data.is_deleted) {
    return next(createError(404, `You have already set the same status.`));
  }

  if (req.user.role !== '1') {
    return next(
      createError(404, `You don't have permission to update the status.`)
    );
  }
  return next();
}
const userById =  async (req, res, next) => {
  return next();
}


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
