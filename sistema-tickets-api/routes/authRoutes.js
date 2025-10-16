const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const { body } = require('express-validator');

// Ruta para obtener el perfil del usuario autenticado
router.get('/perfil', authMiddleware, authController.obtenerPerfil);
router.post('/login', authController.login);

module.exports = router;