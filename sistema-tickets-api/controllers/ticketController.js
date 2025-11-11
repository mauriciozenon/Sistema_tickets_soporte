const ticketService = require('../services/ticketService');
const db = require('../config/db');

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
exports.getTicket = async (req, res) => {
  try {
  
    const { id } = req.params;
    const ticket = await ticketService.obtenerTicketPorId(id);

    res.json({ ticket });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.actualizarTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const cambios = req.body;
    const usuario = cambios.id_usuario || null;

    const resultado = await ticketService.actualizarTicket(id, cambios, usuario);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.eliminarTicket = async (req, res) => {
  try {
    const { id } = req.params;
    await ticketService.borrarTicket(id);
    const resultado = res.status(200).json({ mensaje: 'Ticket eliminado' });
    return resultado;
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerPorUsuario = async (req, res) => {
   try {
    const { id } = req.params;
    const [rows] = await db.query('SELECT * FROM tickets WHERE id_usuario = ?', [id]);
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener tickets del usuario:', error);
    res.status(500).json({ error: 'Error al obtener los tickets del usuario' });
  }
};

exports.listarTicketsPorUsuario = async (req, res) => {
  try {
    const { id_usuario } = req.params; 
    const filtros = { id_usuario };
    const tickets = await ticketService.obtenerTickets(filtros);
    res.json({ tickets });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




