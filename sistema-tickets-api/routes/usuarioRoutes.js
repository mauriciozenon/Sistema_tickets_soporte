const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Ruta para registrar un nuevo usuario
router.post('/', usuarioController.registrarUsuario);

// Ruta para listar todos los usuarios (opcional para pruebas)
router.get('/', usuarioController.listarUsuarios);

module.exports = router;