const _ = require('underscore');
const createError = require('http-errors');
const { dataFromRequest } = require('../../helpers/basic_helper');
const { querys } = require('../../helpers/queryMySql.helpers');
const { OAuth2Client } = require('google-auth-library');
const  fetch = require('node-fetch');
/**
 * Store
 *
 * @param req
 * @param res
 * @param next
 *
 */
const create = async (req, res, next) => {
  try {
    const data = dataFromRequest(req);
    const user = await querys('select * from user where email=?', [data.email]);
    if (!_.isEmpty(user)) {
      return next(createError(400, `Email is already exist`));
    }

    return next();
  } catch (error) {
    return next(createError(400, `Please Check Values`));
  }
};


/**
 * Store
 *
 * @param req
 * @param res
 * @param next
 *
 */
 const createTeacher = async (req, res, next) => {
  try {
    const data = dataFromRequest(req);
    // if(!req.files.teaching_sample){
    //   return next(
    //     createError(404, 'Teacher Sample Video is Invalid')
    //   );
    // }
    // if(!req.files.teacher_introduction_video){
    //   return next(
    //     createError(404, 'Teacher Introduction Video is Invalid')
    //   );
    // }
    // if(!req.files.teacher_resume){
    //   next(
    //     createError(404, 'Teacher Resume is Invalid')
    //   );return
    // }
    const user = await querys('select * from user where email=?', [data.email]);
    if (!_.isEmpty(user)) {
      return next(
        createError(400, `Email is already exist`)
        );
    }

    return next();
  } catch (error) {
    return next(createError(400, `Please Check Values`));
  }     
};

/**
 * Store
 *
 * @param req
 * @param res
 * @param next
 *
 */
const createGoogle = async (req, res, next) => {
  try {
    const data = dataFromRequest(req);
    const oAuth2Client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const googleData = await oAuth2Client.verifyIdToken({ idToken: data.idToken, audience: process.env.GOOGLE_CLIENT_ID });
    console.log(googleData);
    req.googleData = googleData.payload;
    return next();
  } catch (error) {
    return next(createError(400, `Invalid IdToken`));
  }
};
/**
 * Store
 *
 * @param req
 * @param res
 * @param next
 *
 */
const createFacebook = async (req, res, next) => {
  try {
    const data = dataFromRequest(req);
    const facebookData = await fetch(`https://graph.facebook.com/v4.0/me?access_token=${data.authToken}&fields=name%2Cemail%2Cpicture%2Cfirst_name%2Clast_name&method=get&pretty=0&sdk=joey&suppress_http_code=1`);
    req.facebookData =  await facebookData.json();
    if(req.facebookData.error && req.facebookData.error.code === 190){
      return next(createError(400, `Invalid authToken`));
    }
    return next();

  } catch (error) {
    return next(createError(400, `Invalid authToken`));
  }
};
module.exports = {
  create,
  createGoogle,
  createFacebook,
  createTeacher
};
