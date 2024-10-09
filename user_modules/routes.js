const authController = require('./controllers/auth.controller');
const userController = require('./controllers/user.controller');

// Guards
const auth = require('./../guards/auth.guard');

// Policies
const authPolicy = require('./policies/auth.policy');
const userPolicy = require('./policies/user.policy');

// Validation Chains
const authChains = require('./validators/auth.chain');

const validate = require('../helpers/validate');
const userChain = require('./validators/user.chain');
const {uploadFile} = require("./helpers/multer_files_Upload.helpers");

const addRoutes = (app, router) => {
  /**
 * @swagger
 * paths:
 *  /api/deleteUser/{id}:
 *    delete:
 *      tags:
 *      - name: 'Users'
 *      summary: 
 *      security:
 *      - bearerAuth: []
 *      consumes:
 *      - application/json
 *      parameters: 
 *      - name: id
 *        in: path
 *        required: true
 *      - in: body
 *        name: body
 *        description:
 *        required: true
 *        schema:
 *          $ref: '#/definitions/teacherDeleted'
 *      responses:
 *       200:
 *        description : Successfully
 * definitions:
 *  teacherDeleted:
 *    type: object
 *    properties:          
 *            is_deleted:
 *              type: integer
 */
  router.delete(
    '/api/deleteUser/:id',
    auth,
    validate(userChain.deleteUser),
    userPolicy.deleteUser,
    userController.deleteUser
  );
  
  /**
 * @swagger
 * /api/userById/{id}:
 *  get:
 *     tags:
 *     - name: 'Users'
 *     parameters:
 *      - name: id
 *        in: path
 *        required: true
 *     responses:
 *      '200':
 *        description : Successfully
 */
  router.get(
    '/api/userById/:id',
    // auth,
    validate(userChain.userById),
    userPolicy.userById,
    userController.userById
  );

/**
 * @swagger
 * paths:
 *  /api/updateTeacherInfo:
 *   put:
 *     tags:
 *     - name: 'Users'
 *     summary: 
 *     security:
 *      - bearerAuth: []
 *     consumes:
 *      - multipart/form-data
 *     parameters: 
 *      - in: formData
 *        name: first_name
 *        type: string
 *      - in: formData
 *        name: last_name
 *        type: string
 *      - in: formData
 *        name: teacher_current_company
 *        type: string
 *      - in: formData
 *        name: teacher_title_at_company
 *        type: string
 *      - in: formData
 *        name: teacher_location
 *        type: string
 *      - in: formData
 *        name: teaching_sample
 *        type: file
 *      - in: formData
 *        name: teacher_introduction_video
 *        type: file
 *      - in: formData
 *        name: teacher_resume
 *        type: file
 *      - in: formData
 *        name: profile_image
 *        type: file
 *      - in: formData
 *        name: extra_info
 *        type: string
 *      - in: formData
 *        name: new_teaching_sample
 *        type: boolean
 *      - in: formData
 *        name: new_teacher_introduction_video
 *        type: boolean
 *      - in: formData
 *        name: new_teacher_resume
 *        type: boolean
 *      - in: formData
 *        name: new_profile_image
 *        type: boolean
 *        schema:
 *          $ref: '#/definitions/updateTeacher'
 *     responses:
 *       200:
 *          description : Successfully
 * definitions:
 *  updateTeacher:
 *    type: object
 *    properties:
 *            first_name:
 *              type: string
 *              required: true
 *            last_name:
 *              type: string
 *              required: true
 *            teacher_current_company:
 *              type: string
 *              required: false
 *            teacher_title_at_company:
 *              type: string
 *              required: false
 *            teacher_location:
 *              type: string
 *              required: true
 *            teaching_sample:
 *              type: file
 *              required: false
 *            teacher_introduction_video:
 *              type: file
 *              required: false
 *            teacher_resume:
 *              type: file
 *              required: false
 *            profile_image:
 *              type: file
 *              required: false
 *            extra_info:
 *              type: string
 *              required: false
 *            new_teaching_sample:
 *              type: boolean
 *            new_teacher_introduction_video:
 *              type: boolean
 *            new_teacher_resume:
 *              type: boolean
 *            new_profile_image:
 *              type: boolean
 *             
 *  
 */

  router.put(
    '/api/updateTeacherInfo',
    auth,
    uploadFile.fields([{ name: 'profile_image', maxCount: 1 }, { name: 'teaching_sample', maxCount: 1 }, { name: 'teacher_introduction_video', maxCount: 1 }, {name: 'teacher_resume', maxCount:1}]),
    validate(userChain.updateTeacherInfo),
    userPolicy.updateTeacherInfo,
    userController.updateTeacherInfo
  );


  /**
   * @swagger
   * paths:
   *  /api/updateUserInfo:
   *   put:
   *     tags:
   *     - name: 'Users'
   *     summary:
   *     security:
   *      - bearerAuth: []
   *     consumes:
   *      - multipart/form-data
   *     parameters:
   *      - in: formData
   *        name: first_name
   *        type: string
   *      - in: formData
   *        name: last_name
   *        type: string
   *      - in: formData
   *        name: mobile
   *        type: string
   *      - in: formData
   *        name: student_type
   *        type: string
   *      - in: formData
   *        name: dob
   *        type: string
   *      - in: formData
   *        name: email
   *        type: string
   *      - in: formData
   *        name: profile_image
   *        type: file
   *      - in: formData
   *        name: new_profile_image
   *        type: boolean
   *        schema:
   *          $ref: '#/definitions/users'
   *     responses:
   *       200:
   *          description : Successfully
   * definitions:
   *  users:
   *    type: object
   *    properties:
   *            first_name:
   *              type: string
   *              required: true
   *            last_name:
   *              type: string
   *              required: true
   *            mobile:
   *              type: string
   *              required: false
   *            student_type:
   *              type: string
   *              required: false
   *            dob:
   *              type: string
   *              required: true
   *            email:
   *              type: file
   *              required: false
   *            profile_image:
   *              type: file
   *              required: false
   *            new_profile_image:
   *              type: boolean
   *
   *
   */

  router.put(
    '/api/updateUserInfo',
    auth,
    uploadFile.fields([{ name: 'profile_image', maxCount: 1 }]),
    validate(userChain.update),
    userPolicy.update,
    userController.update
  );

/**
 * @swagger
 * paths:
 *  /api/userStatus/{id}/status:
 *    put:
 *      tags:
 *      - name: 'Users'
 *      security:
 *      - bearerAuth: []
 *      consumes:
 *      - application/json
 *      parameters: 
 *      - name: id
 *        in: path
 *        required: true
 *      - in: body
 *        name: body
 *        description:
 *        required: true
 *        schema:
 *          $ref: '#/definitions/teacherStatus'
 *      responses:
 *       200:
 *        description : Successfully
 * definitions:
 *  teacherStatus:
 *    type: object
 *    properties:          
 *            status:
 *              type: string
 */

  router.put(
    '/api/userStatus/:id/status',
    auth,
    validate(userChain.updateStatus),
    userPolicy.updateStatus,
    userController.updateTeacherStatus
  );





/**
 * @swagger
 * paths:
 *  /auth/registerTeacher:
 *   post:
 *     tags:
 *     - name: 'Users'
 *     summary: 
 *     consumes:
 *      - multipart/form-data
 *     parameters: 
 *      - in: formData
 *        name: first_name
 *        type: string
 *      - in: formData
 *        name: last_name
 *        type: string
 *      - in: formData
 *        name: email
 *        type: email
 *      - in: formData
 *        name: password
 *        type: string
 *      - in: formData
 *        name: confirm_password
 *        type: string
 *      - in: formData
 *        name: teacher_current_company
 *        type: string
 *      - in: formData
 *        name: teacher_title_at_company
 *        type: string
 *      - in: formData
 *        name: teacher_location
 *        type: string
 *      - in: formData
 *        name: teaching_sample
 *        type: file
 *      - in: formData
 *        name: teacher_introduction_video
 *        type: file
 *      - in: formData
 *        name: teacher_resume
 *        type: file
 *      - in: formData
 *        name: extra_info
 *        type: string
 *        schema:
 *          $ref: '#/definitions/registerTeacher'
 *     responses:
 *       200:
 *          description : Successfully
 * definitions:
 *  registerTeacher:
 *    type: object
 *    properties:
 *            first_name:
 *              type: string
 *              required: true
 *            last_name:
 *              type: string
 *              required: true
 *            email:
 *              type: string
 *              required: true
 *            confirm_password:
 *              type: string
 *              required: true
 *            password:
 *              type: string
 *              required: true
 *            teacher_current_company:
 *              type: string
 *              required: false
 *            teacher_title_at_company:
 *              type: string
 *              required: false
 *            teacher_location:
 *              type: string
 *              required: true
 *            teaching_sample:
 *              type: file
 *              required: false
 *            teacher_introduction_video:
 *              type: file
 *              required: false
 *            teacher_resume:
 *              type: file
 *              required: false
 *            extra_info:
 *              type: string
 *              required: false
 *             
 *  
 */
  router.post(
    '/auth/registerTeacher',
    uploadFile.fields([{ name: 'teaching_sample', maxCount: 1 }, { name: 'teacher_introduction_video', maxCount: 1 }, {name: 'teacher_resume', maxCount:1}]),
    validate(authChains.createTeacher),
    authPolicy.createTeacher,
    userController.createTeacher
  );

/**
 * @swagger
 * paths:
 *  /auth/register:
 *   post:
 *     tags:
 *     - name: 'Users'
 *     summary: 
 *     consumes:
 *      - application/json
 *     parameters: 
 *      - in: body
 *        name: register
 *        description: Register User
 *        schema:
 *          $ref: '#/definitions/register'
 *     responses:
 *       200:
 *          description : Successfully
 * definitions:
 *  register:
 *    type: object
 *    properties:
 *            email:
 *              type: string
 *              required: true
 *            confirm_password:
 *              type: string
 *            password:
 *              type: string
 *            role:
 *              type: integer
 *            first_name:
 *              type: string
 *            last_name:
 *              type: string
 *            mobile:
 *              type: string
 *            student_type:
 *              type: string
 *            dob:
 *              type: string
 *  
 */
  router.post(
    '/auth/register',
    validate(authChains.create),
    authPolicy.create,
    userController.create
  );
/**
 * @swagger
 * paths:
 *  /auth/GoogleLogin:
 *   post:
 *     tags:
 *     - name: 'Users'
 *     summary: 
 *     consumes:
 *      - application/json
 *     parameters: 
 *      - in: body
 *        name: register
 *        description: Register User
 *        schema:
 *          $ref: '#/definitions/GoogleLogin'
 *     responses:
 *       200:
 *          description : Successfully
 * definitions:
 *  GoogleLogin:
 *    type: object
 *    properties:
 *            idToken:
 *              type: string
 *              required: true
 *  
 */
  router.post(
    '/auth/GoogleLogin',
    validate(authChains.createGoogle),
    authPolicy.createGoogle,
    userController.createGoogle
  );
/**
 * @swagger
 * paths:
 *  /auth/facebookLogin:
 *   post:
 *     tags:
 *     - name: 'Users'
 *     summary: 
 *     consumes:
 *      - application/json
 *     parameters: 
 *      - in: body
 *        name: register
 *        description: Register User
 *        schema:
 *          $ref: '#/definitions/facebookLogin'
 *     responses:
 *       200:
 *          description : Successfully
 * definitions:
 *  facebookLogin:
 *    type: object
 *    properties:
 *            authToken:
 *              type: string
 *              required: true
 *  
 */
  router.post(
    '/auth/facebookLogin',
    validate(authChains.createFacebook),
    authPolicy.createFacebook,
    userController.createFacebook
  );


 /**
 * @swagger
 * paths:
 *  /auth/login:
 *    post:
 *      tags:
 *      - name: 'Users'
 *      summary: 
 *      consumes:
 *      - application/json
 *      parameters: 
 *      - in: body
 *        name: register
 *        description: Body
 *        schema:
 *          $ref: '#/definitions/login'
 *      responses:
 *       200:
 *          description : Successfully
 * definitions:
 *  login:
 *    type: object
 *    properties:
 *            email:
 *              type: string
 *            password:
 *              type: string
 *  
 */
  router.post('/auth/login',
   validate(authChains.login),
    authController.login
   );

  /**
 * @swagger
 * paths:
 *  /auth/refresh-token:
 *    post:
 *      tags:
 *      - name: 'Users'
 *      summary: 
 *      consumes:
 *      - application/json
 *      parameters: 
 *      - in: body
 *        name: register
 *        description: Body
 *        schema:
 *          $ref: '#/definitions/refresh-token'
 *      responses:
 *        200:
 *          description : Successfully
 * definitions:
 *  refresh-token:
 *    type: object
 *    properties:
 *            refreshToken:
 *              type: string
 *  
 */
  router.post('/auth/refresh-token', authController.refreshToken);

    /**
 * @swagger
 * paths:
 *  /auth/logout:
 *    delete:
 *      tags:
 *      - name: 'Users'
 *      summary: 
 *      consumes:
 *      - application/json
 *      parameters: 
 *      - in: body
 *        name: register
 *        description: Body
 *        schema:
 *          $ref: '#/definitions/logout'
 *      responses:
 *        200:
 *          description : Successfully
 * definitions:
 *  logout:
 *    type: object
 *    properties:
 *            refreshToken:
 *              type: string
 *  
 */
  router.delete('/auth/logout', authController.logout);

  /**
 * @swagger
 * /api/users:
 *  get:
 *     tags:
 *     - name: 'Users'
 *     description:
 *     security:
 *         - bearerAuth: []
 *     parameters:
 *     - in: query
 *       name: filters[email]=
 *       schema:
 *        type: integer
 *     - in: query
 *       name: filters[first_name]=
 *       schema:
 *        type: integer
 *     - in: query
 *       name: filters[last_name]=
 *       schema:
 *        type: integer
 *     - in: query
 *       name: filters[role]=
 *       schema:
 *        type: integer
 *     - in: query
 *       name: filters[id]=
 *       schema:
 *        type: integer
 *     - name: page
 *       in: query
 *       schema:
 *        type: integer
 *     - name: page
 *       in: query
 *       schema:
 *        type: integer
 *     - name: per_page
 *       in: query
 *       schema:
 *        type: integer
 *     - name: sort_field
 *       in: query
 *       schema:
 *        type: string
 *     - name: sortOrder
 *       in: query
 *       schema:
 *        type: string
 *     responses:
 *      '200':
 *        description : Successfully
 */
  router.get(
    '/api/users',
    auth,
    validate(userChain.index),
    userPolicy.index,
    userController.index
  );

//     /**
//  * @swagger
//  * paths:
//  *  /api/users:
//  *    put:
//  *      tags:
//  *      - name: 'Users'
//  *      summary: 
//  *      security:
//  *      - bearerAuth: []
//  *      consumes:
//  *      - application/json
//  *      parameters: 
//  *      - in: body
//  *        name: register
//  *        description: Body
//  *        schema:
//  *          $ref: '#/definitions/users'
//  *      responses:
//  *        200:
//  *          description : Successfully
//  * definitions:
//  *  users:
//  *    type: object
//  *    properties:
//  *            name:
//  *              type: string
//  *  
//  */
//   router.put(
//     '/api/users',
//     auth,
//     validate(userChain.update),
//     userPolicy.update,
//     userController.update
//   );

  // Forgot password 
  /**
 * @swagger
 * paths:
 *  /api/forgotPassword:
 *    post:
 *      tags:
 *      - name: 'Users'
 *      summary:
 *      consumes:
 *      - application/json
 *      parameters: 
 *      - in: body
 *        name: register
 *        description: 
 *        required: true
 *        schema:
 *          $ref: '#/definitions/forgotPassword'
 *      responses:
 *        200:
 *          description : Successfully
 * definitions:
 *  forgotPassword:
 *    type: object
 *    properties:
 *            email:
 *              type: string
 *            
 */
  router.post(
    "/api/forgotPassword",
    validate(userChain.forgotPassword ),
    userPolicy.forgotPassword,
    userController.forgotPassword
  );

  /**
 * @swagger
 * paths:
 *  /api/forgotPasswordChange:
 *    post:
 *      tags:
 *      - name: 'Users'
 *      summary:
 *      consumes:
 *      - application/json
 *      parameters: 
 *      - in: body
 *        name: register
 *        description: 
 *        required: true
 *        schema:
 *          $ref: '#/definitions/forgotPasswordChange'
 *      responses:
 *        200:
 *          description : Successfully
 * definitions:
 *  forgotPasswordChange:
 *    type: object
 *    properties:
 *            token:
 *              type: string
 *            password:
 *              type: string
 *            confirmPassword:
 *              type: string
 *            
 */
   router.post(
    "/api/forgotPasswordChange",
    validate(userChain.forgotPasswordChange ),
    userPolicy.forgotPasswordChange,
    userController.forgotPasswordChange
  );

  // change password 
/**
 * @swagger
 * paths:
 *  /api/changePassword:
 *    post:
 *      tags:
 *      - name: 'Users'
 *      summary: 
 *      security:
 *      - bearerAuth: []
 *      consumes:
 *      - application/json
 *      parameters: 
 *      - in: body
 *        name: register
 *        description: Body
 *        required: true
 *        schema:
 *          $ref: '#/definitions/change-password'
 *      responses:
 *        200:
 *          description : Successfully
 * definitions:
 *  change-password:
 *    type: object
 *    properties:
 *            password:
 *              type: string
 *            newPassword:
 *              type: string
 *            confirm_password:
 *              type: string
 *            
 */
  router.post(
    "/api/changePassword",
    auth,
    validate(userChain.changePassword ),
    userPolicy.changePassword,
    userController.changePassword
  );

    /**
 * @swagger
 * paths:
 *  /api/emailVerification:
 *    post:
 *      tags:
 *      - name: 'Users'
 *      summary:
 *      consumes:
 *      - application/json
 *      parameters: 
 *      - in: body
 *        name: register
 *        description: 
 *        required: true
 *        schema:
 *          $ref: '#/definitions/emailVerification'
 *      responses:
 *        200:
 *          description : Successfully
 * definitions:
 *  emailVerification:
 *    type: object
 *    properties:
 *            token:
 *              type: string
 *            
 */
     router.post(
      "/api/emailVerification",
      validate(userChain.emailVerification ),
      userPolicy.emailVerification,
      userController.emailVerification
    );

};

module.exports = addRoutes;
