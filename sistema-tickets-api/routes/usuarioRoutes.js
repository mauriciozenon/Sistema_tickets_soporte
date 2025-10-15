const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const authMiddleware = require('../middleware/authMiddleware');
const rolMiddleware = require('../middleware/rolMiddleware');
const { body } = require('express-validator');

router.post('/', usuarioController.registrarUsuario);
router.get('/', usuarioController.listarUsuarios);
router.put('/:id', authMiddleware, rolMiddleware(['administrador']), usuarioController.actualizarUsuario);
router.delete('/:id', authMiddleware, rolMiddleware(['administrador']), usuarioController.eliminarUsuario);
router.post('/login', usuarioController.iniciarSesion);

module.exports = router;