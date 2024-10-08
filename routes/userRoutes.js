const express = require('express');
const logError = require('../error/log');
const { registerUser, loginUser } = require('../controllers/userController');
const { validateUser } = require('../middleware/validate');
const { outlets } = require('../erp_apies/outletsController');
const { menuOfOutlet} = require('../erp_apies/menuOfOutletController');
const  {syncMenuOfOutlet}  = require('../erp_apies/syncController');
const authMiddleware = require('../middleware/auth');
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
    res.status(404).json({ error: 'Method Not Found' });
});
router.all('/getMenuForParticularOutlets', (req, res) => {
    res.status(404).json({ error: 'Method Not Found' });
});
router.all('/getListOfOutlets', (req, res) => {
    res.status(404).json({ error: 'Method Not Found' });
});

module.exports = router;
