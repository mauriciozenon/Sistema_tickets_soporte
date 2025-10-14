const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const authMiddleware = require('../middleware/authMiddleware');

console.log('registrarTicket:', typeof ticketController.registrarTicket); // debe imprimir "function"
console.log('listarTickets:', typeof ticketController.listarTickets);     // debe imprimir "function"

router.post('/', ticketController.registrarTicket);
router.get('/', ticketController.listarTickets);
router.put('/:id', authMiddleware, ticketController.actualizarTicket);

module.exports = router;