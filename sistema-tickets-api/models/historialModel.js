const pool = require('../config/db');

exports.registrarHistorial = async (id_ticket, id_usuario, campo, anterior, nuevo, comentario) => {
  const [result] = await pool.query(
    `INSERT INTO Historial (id_ticket, id_usuario, campo_modificado, valor_anterior, valor_nuevo, comentario)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [id_ticket, id_usuario, campo, anterior, nuevo, comentario]
  );
  return { mensaje: 'Historial registrado', id: result.insertId };
};

exports.obtenerHistorialPorTicket = async (id_ticket) => {
  const [rows] = await pool.query(
    `SELECT * FROM Historial WHERE id_ticket = ? ORDER BY fecha_hora DESC`,
    [id_ticket]
  );
  return rows;
};