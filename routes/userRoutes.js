const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const { validateUser } = require('../middleware/validate');
const { outlets } = require('../erp_apies/outletsController');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.post('/register', validateUser, registerUser);
router.post('/login', validateUser, loginUser);
router.get('/outlets',outlets );

module.exports = router;
