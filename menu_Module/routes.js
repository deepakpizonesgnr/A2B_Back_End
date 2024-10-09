

// Guards
// const auth = require('./../guards/auth.guard');

// Policies
// const authPolicy = require('./policies/auth.policy');
// const userPolicy = require('./policies/user.policy');

// Validation Chains
// const authChains = require('./validators/auth.chain');

// const validate = require('../helpers/validate');
const validateUser = require ('./helpers/validation_schema')
const menuOfOutlet = require('./controllers/menuController')
const syncOfOutlet = require('./controllers/syncMenuController')
// const userChain = require('./validators/user.chain');

const menuRoutes = (app, router) => {
 
     router.post(
      "/getMenu",
      validateUser.validateUser,menuOfOutlet.menuOfOutlet
    );
    router.post(
      "/syncMenu",
      validateUser.validateUser,syncOfOutlet.syncOfOutlet
    );

};

module.exports = menuRoutes;
