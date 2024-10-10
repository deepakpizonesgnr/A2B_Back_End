

const validateUser = require ('./helpers/validation_schema')
const menuOfOutlet = require('./controllers/menuController')
const authMiddleware = require('../guards/auth')
// const userChain = require('./validators/user.chain');

const menuRoutes = (app, router) => {
 
     router.post(
      "/getMenu",authMiddleware,
      validateUser.validateUser,menuOfOutlet.menuOfOutlet
    );
    router.post(
      "/syncMenu",authMiddleware,
      validateUser.validateUser,menuOfOutlet.syncOfOutlet
    );

};

module.exports = menuRoutes;
