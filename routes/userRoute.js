const express= require('express');
const {register, login, profile} = require('../controllers/userController');
const verifyToken = require('../middleware/authMiddlware');
const router= express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', verifyToken, profile);

module.exports= router