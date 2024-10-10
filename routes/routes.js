const express = require('express');
const logError = require('../error/log');
const errors = require('../error/error')
const app = express();
const { registerUser, loginUser } = require('../user_modules/controllers/userController');
const { validateUser } = require('../helpers/validate');
const  menuRoutes = require('../menu_Module/routes');
const {forgetPassword,} = require('../user_modules/resetpassword')
const authMiddleware = require('../guards/auth');
const router = express.Router();
const outletRoutes = require('../Outlets_Module/routes')
const userRoutes = require('../user_modules/routes')
const aggregatorRoutes = require('../aggregator_module/routes')

// router.post('/login', validateUser, loginUser);
// router.post('/user',forgetPassword)
// router.post('/logs', (req, res) => {
//     const logEntry = req.body;
//     logError(logEntry);
//     res.status(200).send({ message: 'Log received' });
//   });


// module.exports = router;

module.exports = (app) => {
    app.use("/api", router);
    outletRoutes(app, router);
    menuRoutes(app, router);
    userRoutes(app,router);
    aggregatorRoutes(app,router);


  };