const pool = require('../config/db');

exports.crearTicket = async (asunto, descripcion, id_usuario, prioridad) => {
  const [result] = await pool.query(
    'INSERT INTO Ticket (asunto, descripcion, id_usuario, prioridad, estado) VALUES (?, ?, ?, ?, ?)',
    [asunto, descripcion, id_usuario, prioridad, 'pendiente']
  );
  return { mensaje: 'Ticket creado', id: result.insertId };
};
exports.listarTickets = async () => {
  const [rows] = await pool.query('SELECT * FROM Ticket');
  return rows;
};
