const ticketModel = require('../models/ticketModel');

exports.crearTicket = async (datos) => {
  try {
    const { asunto, descripcion, id_usuario, prioridad } = datos;

    if (!asunto || !descripcion || !id_usuario) {
      throw new Error('Faltan campos obligatorios para la creacion del ticket');
    }

    return await ticketModel.crearTicket(asunto, descripcion, id_usuario, prioridad || 'media');
  } catch (err) {
    console.error('Error en ticketService:', err);
    throw err;
  }
};

exports.obtenerTickets = async () => {
  return await ticketModel.listarTickets();
};