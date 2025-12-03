const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const { body } = require('express-validator');

router.get('/perfil', authController.obtenerPerfil);
router.post('/login', authController.login);

module.exports = router;