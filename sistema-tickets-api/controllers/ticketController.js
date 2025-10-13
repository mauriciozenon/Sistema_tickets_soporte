const ticketService = require('../services/ticketService');

exports.registrarTicket = async (req, res) => {
  try {
    const nuevoTicket = await ticketService.crearTicket(req.body);
    res.status(201).json(nuevoTicket);
  } catch (error) {
    console.error('Error al registrar ticket:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.listarTickets = async (req, res) => {
  try {
    const tickets = await ticketService.obtenerTickets();
    res.json(tickets);
  } catch (error) {
    console.error('Error al obtener tickets:', error);
    res.status(500).json({ error: error.message });
  }
};