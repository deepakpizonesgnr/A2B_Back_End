const express = require('express');
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

module.exports = router;
