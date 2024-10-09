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

const menuRoutes = (app, router) => {
 
     router.post(
      "/getMenu",
      validate(userChain.emailVerification ),
      userPolicy.emailVerification,
      userController.emailVerification
    );
    router.post(
      "/syncMenu",
      validate(userChain.emailVerification ),
      userPolicy.emailVerification,
      userController.emailVerification
    );

};

module.exports = menuRoutes;
