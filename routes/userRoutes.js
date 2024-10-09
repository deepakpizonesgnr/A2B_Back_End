const express = require('express');
const logError = require('../error/log');
const errors = require('../error/error')
const { registerUser, loginUser } = require('../user_modules/userController');
const { validateUser } = require('../helpers/validate');
const { menuOfOutlet} = require('../erp_modules/menuOfOutletController');
const {forgetPassword,} = require('../user_modules/resetpassword')
const authMiddleware = require('../guards/auth');
const router = express.Router();
const outletRoutes = require('../Outlets_Module/routes')

router.post('/login', validateUser, loginUser);
router.get('/outlet',outletRoutes );
router.post('/menu',menuOfOutlet );
router.post('/user',forgetPassword)
router.post('/logs', (req, res) => {
    const logEntry = req.body;
    logError(logEntry);
    res.status(200).send({ message: 'Log received' });
  });


module.exports = router;
