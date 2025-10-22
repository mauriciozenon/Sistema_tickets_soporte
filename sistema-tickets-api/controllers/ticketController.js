const ticketService = require('../services/TicketService');

exports.registrarTicket = async (req, res) => {
  try {
    const nuevoTicket = await ticketService.crearTicket(req.body);
    res.status(201).json(nuevoTicket);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.listarTickets = async (req, res) => {
  try {
    const { page = 1, limit = 10, ...filtros } = req.query;
    const offset = (page - 1) * limit;

    const tickets = await ticketService.obtenerTickets(filtros, limit, offset);
    const total = await ticketService.contarTickets(filtros);

    res.json({ tickets, total });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.actualizarTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const cambios = req.body;
    const usuario = req.usuario?.id_usuario || null;

    const resultado = await ticketService.actualizarTicket(id, cambios, usuario);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
