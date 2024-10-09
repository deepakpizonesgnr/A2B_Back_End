const _ = require('underscore');
const createError = require('http-errors');
const userModel = require('../models/user.model');
const { authSchema } = require('../helpers/validation_schema');
const { querys } = require('../../helpers/queryMySql.helpers');
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} = require('../helpers/jwt_helper');
const { renderUser } = require('../helpers/index');

const {
  dataFromRequest,
  createResponseObject,
} = require('../../helpers/basic_helper');

var rand = function (low, high) {
  return Math.floor(Math.random() * (high - low) + low);
};

module.exports = {

  login: async (req, res, next) => {
    try {
      const result = await authSchema.validateAsync(req.body);
      let emailVerification = await querys('SELECT * FROM `user` WHERE `email`=? AND `email_verification`=?', [result.email,'1']);

      if (!emailVerification[0]) throw createError.NotFound('Please email verification');

      let statusVerification = await querys('SELECT * FROM `user` WHERE `email`=? AND `status`=?', [result.email,'1']);

      if (!statusVerification[0]) throw createError.NotFound('Please connect admin');

      let user = await querys('SELECT * FROM `user` WHERE `email`=? ', [result.email]);

      if (!user[0]) throw createError.NotFound('User not registered');

      const isMatch = await userModel.isValidPassword(result.password,user[0].password);
      if (!isMatch)
        throw createError.Unauthorized('Username/password not valid');

      const accessToken = await signAccessToken(user[0].id);
      const refreshToken = await signRefreshToken(user[0].id);
      user = renderUser(user[0]);

      return createResponseObject(res, 'user succesfully login', {
        accessToken,
        refreshToken,
        user,
        status: true
      });
    } catch (error) {
      if (error.isJoi === true)
        return next(createError.BadRequest('Invalid Username/Password'));
      next(error);
    }
  },

  refreshToken: async (req, res, next) => {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) throw createError.BadRequest();
      const userId = await verifyRefreshToken(refreshToken);
      const user = await querys('select * from user where id=? ', [userId]);
      console.log(user);
      if (!user) {
        throw createError.NotFound(`User is not exist`);
      }
      const accessToken = await signAccessToken(userId);
      const refToken = await signRefreshToken(userId);

      res.send({ accessToken: accessToken, refreshToken: refToken });
    } catch (error) {
      next(error);
    }
  },

  logout: async (req, res, next) => {
    try {
      const { refreshToken } = req.body;
      const userId = await verifyRefreshToken(refreshToken);
      const user = await userModel.findById(userId);
      user.refresh_token = '';
      await user.save();
      return createResponseObject(res, 'User is successfully logout.', []);
    } catch (error) {
      next(error);
    }
  },
};
