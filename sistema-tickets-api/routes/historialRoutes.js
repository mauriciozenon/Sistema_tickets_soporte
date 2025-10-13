const express = require('express');
const router = express.Router();
const historialController = require('../controllers/historialController');

router.post('/', historialController.registrarHistorial);
router.get('/:id_ticket', historialController.obtenerHistorial);

module.exports = router;