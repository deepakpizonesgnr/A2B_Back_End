
// const validateUser = require('../helpers/validate');
const validateUser = require('./helpers/validation_schema')
const User = require('./controllers/userController')

const addRoutes = (app, router) => {
  router.post('/auth/login',
   User.loginUser
   );
 router.post('/auth/forgetPassword',
    User.forgetPassword
    );
   router.post('/auth/verified-otp',
    User.verifiedOtp
    );
 router.post('/auth/reset-password',
      User.resetPassword
      );

};

module.exports = addRoutes;
