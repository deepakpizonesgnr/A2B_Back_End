const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const { validateUser } = require('../middleware/validate');
const { outlets } = require('../erp_apies/outletsController');
const { menuOfOutlet} = require('../erp_apies/menuOfOutletController');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.post('/register', validateUser, registerUser);
router.post('/login', validateUser, loginUser);
router.get('/getListOfOutlets',outlets );
router.get('/getMenuForParticularOutlets',menuOfOutlet );

module.exports = router;
