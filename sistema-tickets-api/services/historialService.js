const historialModel = require('../models/historialModel');

exports.registrarHistorial = async ({ id_ticket, id_usuario, campo_modificado, valor_anterior, valor_nuevo, comentario }) => {
  if (!id_ticket || !campo_modificado) {
    throw new Error('Faltan campos obligatorios');
  }

  return await historialModel.registrarHistorial(
    id_ticket,
    id_usuario || null,
    campo_modificado,
    valor_anterior || '',
    valor_nuevo || '',
    comentario || ''
  );
};

exports.obtenerHistorial = async (id_ticket) => {
  if (!id_ticket) throw new Error('ID de ticket requerido');
  return await historialModel.obtenerHistorialPorTicket(id_ticket);
};