const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const authMiddleware = require('../middleware/authMiddleware');

console.log('registrarTicket:', typeof ticketController.registrarTicket);
console.log('listarTickets:', typeof ticketController.listarTickets);

router.post('/', ticketController.registrarTicket);
router.get('/', ticketController.listarTickets);

router.get('/:id', ticketController.getTicket);
router.put('/:id', ticketController.actualizarTicket);
router.delete('/:id', ticketController.eliminarTicket);
router.get('/usuario/:id', ticketController.obtenerPorUsuario);
// router.get('/usuario/:id', ticketController.listarTicketsPorUsuario);
router.get('/usuario/:id_usuario', ticketController.listarTicketsPorUsuario);



module.exports = router;