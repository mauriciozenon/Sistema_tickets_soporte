const pool = require('../config/db');

// Método para crear un nuevo ticket
exports.crearTicket = async (asunto, descripcion, id_usuario, prioridad) => {
  const [result] = await pool.query(
    'INSERT INTO Ticket (asunto, descripcion, id_usuario, prioridad, estado) VALUES (?, ?, ?, ?, ?)',
    [asunto, descripcion, id_usuario, prioridad, 'pendiente']
  );
  return { mensaje: 'Ticket creado', id: result.insertId };
};
// Método para listar todos los tickets
exports.listarTickets = async () => {
  const [rows] = await pool.query('SELECT * FROM Ticket');
  return rows;
};

// Método para filtrar tickets
exports.filtrarTickets = async (filtros) => {
  let query = 'SELECT * FROM Ticket WHERE 1=1';
  const params = [];

  if (filtros.estado) {
    query += ' AND estado = ?';
    params.push(filtros.estado);
  }

  if (filtros.prioridad) {
    query += ' AND prioridad = ?';
    params.push(filtros.prioridad);
  }

  if (filtros.id_usuario) {
    query += ' AND id_usuario = ?';
    params.push(filtros.id_usuario);
  }

  if (filtros.desde) {
    query += ' AND fecha_hora >= ?';
    params.push(filtros.desde);
  }

  if (filtros.hasta) {
    query += ' AND fecha_hora <= ?';
    params.push(filtros.hasta);
  }

  const [rows] = await pool.query(query, params);
  return rows;
};

// Método para obtener un ticket por su ID
exports.obtenerTicketPorId = async (id_ticket) => {
  const [rows] = await pool.query('SELECT * FROM Ticket WHERE id_ticket = ?', [id_ticket]);
  return rows[0];
};

// Método para actualizar un ticket
exports.actualizarTicket = async (id_ticket, cambios) => {
  const campos = Object.keys(cambios);
  const valores = Object.values(cambios);

  const setClause = campos.map(c => `${c} = ?`).join(', ');
  await pool.query(`UPDATE Ticket SET ${setClause} WHERE id_ticket = ?`, [...valores, id_ticket]);
};