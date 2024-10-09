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

const orderRoutes = (app, router) => {
 
     router.post(
      "/api/emailVerification",
      validate(userChain.emailVerification ),
      userPolicy.emailVerification,
      userController.emailVerification
    );

};

module.exports = orderRoutes;
