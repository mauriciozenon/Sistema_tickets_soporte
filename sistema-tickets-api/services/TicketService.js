const ticketModel = require('../models/ticketModel');
const historialService = require('./historialService');


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

exports.obtenerTickets = async (filtros) => {
  return await ticketModel.filtrarTickets(filtros);
};

exports.actualizarTicket = async (id_ticket, cambios, id_usuario) => {
  const ticketActual = await ticketModel.obtenerTicketPorId(id_ticket);
  if (!ticketActual) throw new Error('Ticket no encontrado');

  const camposModificables = ['estado', 'prioridad'];
  const actualizaciones = {};

  for (const campo of camposModificables) {
    if (cambios[campo] && cambios[campo] !== ticketActual[campo]) {
      actualizaciones[campo] = cambios[campo];

      await historialService.registrarHistorial({
        id_ticket,
        id_usuario,
        campo_modificado: campo,
        valor_anterior: ticketActual[campo],
        valor_nuevo: cambios[campo],
        comentario: cambios.comentario || ''
      });
    }
  }

  if (Object.keys(actualizaciones).length === 0) {
    throw new Error('No hay cambios para aplicar');
  }

  await ticketModel.actualizarTicket(id_ticket, actualizaciones);
  return { mensaje: 'Ticket actualizado', cambios: actualizaciones };
};
