const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

router.post('/', ticketController.registrarTicket);
router.get('/', ticketController.listarTickets);

module.exports = router;