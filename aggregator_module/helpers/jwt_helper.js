const _ = require("underscore");
const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const { querys } = require('../../helpers/queryMySql.helpers');

//Env Parameters
const {
  ACCESS_TOKEN_EXPIRATION_TIME,
  REFRESH_TOKEN_EXPIRATION_TIME
} = process.env;

module.exports = {
  signAccessToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {};
      const secret = process.env.ACCESS_TOKEN_SECRET;
      const options = {
        expiresIn: ACCESS_TOKEN_EXPIRATION_TIME,
        issuer: "nuredner.com",
        audience: userId.toString(),
      };
      console.log(options);
      JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.log(err.message);
          reject(createError.InternalServerError());
          return;
        }
        resolve(token);
      });
    });
  },
  verifyAccessToken: (req, res, next) => {
    if (!req.headers["authorization"]) return next(createError.Unauthorized());
    const authHeader = req.headers["authorization"];
    const bearerToken = authHeader.split(" ");
    const token = bearerToken[1];
    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err) {
        const message =
          err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
        return next(createError.Unauthorized(message));
      }
      req.payload = payload;
      next();
    });
  },
  signRefreshToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {};
      const secret = process.env.REFRESH_TOKEN_SECRET;
      const options = {
        expiresIn: REFRESH_TOKEN_EXPIRATION_TIME,
        issuer: "nuredner.com",
        audience: userId.toString(),
      };
      JWT.sign(payload, secret, options, async (err, token) => {
        if (err) {
          reject(createError.InternalServerError());
          return;
        }

        const user = await querys('select * from user where id=? ', [userId]);

        if (_.isEmpty(user)) {
          reject(createError.NotFound("user not found"));
          return;
        }
        await querys('UPDATE user SET refresh_token=? where id=?', [token, userId]);
        resolve(token);
      });
    });
  },
  verifyRefreshToken: (refreshToken) => {
    console.log(refreshToken);
    return new Promise((resolve, reject) => {
      JWT.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, payload) => {
          if (err) return reject(createError.Unauthorized());
          const userId = payload.aud;
          const user = await querys('select * from user where id=? ', [userId]);

          if (_.isEmpty(user)) {
            reject(createError.NotFound("user not found"));
            return;
          }

          if (refreshToken === user[0].refresh_token) {
            return resolve(userId);
          }
          reject(createError.Unauthorized());
          return;
        }
      );
    });
  },

  verifyRefreshTokenForgotPasswordC: (refreshToken) => {
    return new Promise((resolve, reject) => {
      JWT.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, payload) => {
          if (err) {
            reject(createError.NotFound("user not found"));
            return;
          }
          return resolve(payload.aud);
        }
      );
    });
  },
};
