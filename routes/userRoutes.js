const express = require('express');
const logError = require('../error/log');
const errors = require('../error/error')
const { registerUser, loginUser } = require('../user_modules/userController');
const { validateUser } = require('../helpers/validate');
const { outlets } = require('../erp_modules/outletsController');
const { menuOfOutlet} = require('../erp_modules/menuOfOutletController');
const  {syncMenuOfOutlet}  = require('../erp_modules/syncController');
const authMiddleware = require('../guards/auth');
const router = express.Router();

router.post('/register', validateUser, registerUser);
router.post('/login', validateUser, loginUser);
router.get('/getListOfOutlets',outlets );
router.post('/getMenuForParticularOutlets',menuOfOutlet );
router.post('/syncMenuForParticularOutlets',syncMenuOfOutlet );
router.post('/logs', (req, res) => {
    const logEntry = req.body;
    logError(logEntry);
    res.status(200).send({ message: 'Log received' });
  });
////////////////////////if user try with  wrong method
router.all('/syncMenuForParticularOutlets', (req, res) => {
    res.status(404).json({ error: errors[404] });
});
router.all('/getMenuForParticularOutlets', (req, res) => {
    res.status(404).json({ error: errors[404] });
});
router.all('/getListOfOutlets',authMiddleware, (req, res) => {
    res.status(404).json({ error: errors[404] });
});

module.exports = router;
