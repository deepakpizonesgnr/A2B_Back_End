const _ = require('underscore');
const userModel = require('../models/user.model');
const { querys } = require('../../helpers/queryMySql.helpers');
const createError = require('http-errors');
const nodemailerCtl = require("../../helpers/nodemailer.helper");
const bcrypt = require("bcrypt");
const { prepareFilters } = require('../../helpers/basic_helper');
const { prepareTotalFilters } = require('../../helpers/basic_helper');

const { signAccessToken, signRefreshToken } = require('../helpers/jwt_helper');


/**
 * Get paginated list of user
 *
 * @param user
 * @param filters
 * @param page
 * @param perPage
 * @param sortField
 * @param sortOrder
 *
 * @returns {*}
//  */
const index = async (data) => {
  try {
    _.pick(data.filters, userModel.filtersSchema || {});
    if (userModel.filtersSchema.indexOf(data.sort_field) == -1) {
      data.sort_field = '';
    }
    let userTotal = await querys(`select * from user ${prepareTotalFilters(data)}`);
    let user = await querys(`select * from user ${prepareFilters(data)}`);
    json = {
      items: user,
      page: !data.page ? 0 : data.pag,
      per_page: !data.per_page ? 10 : data.per_page,
      totalCount: userTotal.length,
      totalPages: userTotal.length / (!data.per_page ? 10 : data.per_page),
    }
    return json;
  } catch (e) {
    console.log(e);
  }
};


// /**
//  * Update
//  *
//  * @param user
//  * @param data
//  *
//  * @returns {*}
//  */
const update = async (data, filePath, user) => {
  try {

    if (data.new_profile_image === "true") {
      data.profile_image = filePath.profile_image[0].path;
      await querys('UPDATE user set `first_name`=?, last_name=?, email=?, student_type=?, mobile=?, dob=?, profile_image=? where `id`=?', [data.first_name, data.last_name, data.email, data.student_type, data.mobile, data.dob, data.profile_image, user.id]);
    } else {
      await querys('UPDATE user set `first_name`=?, last_name=?, email=?, student_type=?, mobile=?, dob=? where `id`=?', [data.first_name, data.last_name, data.email, data.student_type, data.mobile, data.dob, user.id]);
    }

    return
  } catch (error) {
    return createError(400, error);
  }
};

/**
 * create
 *
 * @param data
 *
 * @returns {*}
 */
const create = async (data) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);
    data.password = hashedPassword;
    data = _.pick(data, userModel.DBschema);
    await querys('INSERT INTO user SET ?', data);
    const user = await querys('select * from user where email=?', [data.email]);
    const refreshToken = await signRefreshToken(user[0].id);
    let maildata = {
      to: data.email,
      subject: 'test Mail ?',
      text: `Email`,
      html: `<a href="${process.env.EMAIL_VERIFICATION_URL}${refreshToken}">Visit Link</a>`
    }
    // mail send function
    nodemailerCtl.mailerConnection(maildata);
    return

  } catch (error) {
    return createError(400, error);
  }
};




const createTeacher = async (data, teacher_documents) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);
    data.password = hashedPassword;
    data.role = 2;
    data.status = '0';
    if(teacher_documents.teaching_sample){
      data.teaching_sample = teacher_documents.teaching_sample[0].path;
    }
    if(teacher_documents.teacher_introduction_video){
      data.teacher_introduction = teacher_documents.teacher_introduction_video[0].path;
    }
    if(teacher_documents.teacher_resume){
      data.teacher_resume = teacher_documents.teacher_resume[0].path;
    }
    schemaModel = _.pick(data, userModel.DBschema);
    await querys('INSERT INTO user SET ?', schemaModel);
    const user = await querys('select * from user where email=?', [schemaModel.email]);    
    const refreshToken = await signRefreshToken(user[0].id);
    let maildata = {
      to: data.email,
      subject: 'test Mail ?',
      text: `Email`,
      html: `<a href="${process.env.EMAIL_VERIFICATION_URL}${refreshToken}">Visit Link</a>`
    }
    // mail send function
    nodemailerCtl.mailerConnection(maildata);
    return
  } catch (error) {
    return createError(400, error);
  }
};

const updateTeacherInfo = async (data, teacher_documents, user_id) => {
  try{
    if(data.new_teaching_sample === "true"){
      data.teaching_sample = teacher_documents.teaching_sample[0].path;
    }
    if(data.new_profile_image === "true"){
      data.profile_image = teacher_documents.profile_image[0].path;
    }
    if(data.new_teacher_introduction_video === "true"){
      data.teacher_introduction = teacher_documents.teacher_introduction_video[0].path;
    }
    if(data.new_teacher_resume === "true"){
      data.teacher_resume = teacher_documents.teacher_resume[0].path;
    }
    schemaModel = _.pick(data, userModel.DBschema);
    await querys('UPDATE user SET ? where id = ?', [schemaModel, user_id]);    
    return
  }catch (error) {
    return createError(400, error);
  }
}


const updateTeacherStatus = async (data) => {
  try {
    await querys('UPDATE user set `status`=? where `id`=?', [data.status, data.id]);
    return
  } catch (error) {
    return createError(400, error);
  }
}


/**
 * createGoogle
 *
 * @param data
 *
 * @returns {*}
 */
const createGoogle = async (data) => {
  try {
    const user = await querys('select * from user where email=?', [data.email]);
    if (!_.isEmpty(user)) {
      const accessToken = await signAccessToken(user[0].id);
      const refreshToken = await signRefreshToken(user[0].id);
      return { accessToken, refreshToken, user };
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(data.email + data.sub, salt);

      let schemaModel = {
        email: data.email,
        password: hashedPassword,
        role: 3,
        last_name: data.family_name,
        first_name: data.given_name
      };
      schemaModel = _.pick(schemaModel, userModel.DBschema);
      await querys('INSERT INTO user SET ?', schemaModel);
      let userData = await querys('select * from user where email=? ', [data.email]);
      const accessToken = await signAccessToken(userData[0].id);
      const refreshToken = await signRefreshToken(userData[0].id);
      return { accessToken, refreshToken, userData };
    }
  } catch (error) {
    return createError(400, error);
  }
};
const createFacebook = async (data) => {
  try {
    const user = await querys('select * from user where email=?', [data.first_name + data.id + '@gmail.com']);
    if (!_.isEmpty(user)) {
      const accessToken = await signAccessToken(user[0].id);
      const refreshToken = await signRefreshToken(user[0].id);
      return { accessToken, refreshToken, user };
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(data.first_name + data.id + '@gmail.com', salt);

      let schemaModel = {
        email: data.first_name + data.id + '@gmail.com',
        password: hashedPassword,
        role: 3,
        last_name: data.last_name,
        first_name: data.first_name
      };
      schemaModel = _.pick(schemaModel, userModel.DBschema);
      await querys('INSERT INTO user SET ?', schemaModel);
      let userData = await querys('select * from user where email=? ', [data.first_name + data.id + '@gmail.com']);
      const accessToken = await signAccessToken(userData[0].id);
      const refreshToken = await signRefreshToken(userData[0].id);
      return { accessToken, refreshToken, userData };
    }
  } catch (error) {
    return createError(400, error);
  }
};


// /**
//  * Update
//  *
//  * @param data
//  *
//  * @returns {*}
//  */
const forgotPassword = async (data,id) => {
  // create password
  const refreshToken = await signRefreshToken(id);
  let maildata = {
    to: data.email,
    subject: 'test Mail ?',
    text: `Email`,
    html: `<a href="${process.env.FORGOT_PASSWORD_URL}${refreshToken}">Visit Link</a>`
  }
  // mail send function
  nodemailerCtl.mailerConnection(maildata);
  return ;
};
// /**
//  * Update
//  *
//  * @param data
//  *
//  * @returns {*}
//  */
const forgotPasswordChange = async (data, id) => {
  // create password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(data.password, salt);
  // find and update 
  // return await userModel1.update({ "_id": user._id }, { password: hashedPassword }, { upsert: true })
  const user = await querys('UPDATE user set `password`=? where `id`=?', [hashedPassword,id]);
};
// /**
//  * Update
//  *
//  * @param data
//  *
//  * @returns {*}
//  */
const changePassword = async (data, id) => {
  // create password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(data.password, salt);
  // find and update 
  // return await userModel1.update({ "_id": user._id }, { password: hashedPassword }, { upsert: true })
  const user = await querys('UPDATE user set `password`=? where `id`=?', [hashedPassword,id]);
};
// /**
//  * Update
//  *
//  * @param data
//  *
//  * @returns {*}
//  */
const emailVerification = async (id) => {
  const user = await querys('UPDATE user set `email_verification`=? where `id`=?', ['1',id]);
};

const deleteUser = async (data, id) => {
  try {
    await querys('UPDATE user set `is_deleted`=? where `id`=?', [data.is_deleted, id]);
    return
  } catch (error) {
    return createError(400, error);
  }
}
const userById = async (id) => {
  try {
    return await querys('select * from user where id=?', [id])
    
  } catch (error) {
    return createError(400, error);
  }
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
