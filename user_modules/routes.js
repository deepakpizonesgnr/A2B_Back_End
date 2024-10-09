
const validateUser = require('../helpers/validate');
const validatePassword = require('./helpers/validetionPasswprd')
const User = require('./controllers/userController')

const addRoutes = (app, router) => {

  router.post('/auth/login',
    validateUser.validateUser,
   User.loginUser
   );

 router.post('/auth/forgetPassword',
  validatePassword.forgetPassword ,
    User.forgetPassword
    );


};

module.exports = addRoutes;
