
// const validateUser = require('../helpers/validate');
const validateUser = require('./helpers/validation_schema')
const User = require('./controllers/userController')

const addRoutes = (app, router) => {

  router.post('/auth/login',
    validateUser.validateUser,
   User.loginUser
   );
 router.post('/auth/forgetPassword',
  validateUser.forgetPassword ,
    User.forgetPassword
    );
   router.post('/auth/verified-otp',
    validateUser.verificationOtp ,
    User.verifiedOtp
    );
 router.post('/auth/reset-password',
  validateUser.resetPassword,
      User.resetPassword
      );

};

module.exports = addRoutes;
