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
// models/ticketModel.js
exports.filtrarTickets = async (filtros, limit, offset) => {
  let query = `
    SELECT t.*, u.nombre 
    FROM Ticket t
    JOIN Usuario u ON u.id_usuario = t.id_usuario
    WHERE 1=1
  `;

  const params = [];

  if (filtros.estado) {
    query += " AND t.estado = ?";
    params.push(filtros.estado);
  }

  if (filtros.prioridad) {
    query += " AND t.prioridad = ?";
    params.push(filtros.prioridad);
  }

  if (filtros.id_usuario) {
    query += " AND t.id_usuario = ?";
    params.push(filtros.id_usuario);
  }

  if (filtros.desde) {
    query += " AND fecha_hora >= ?";
    params.push(filtros.desde);
  }

  if (filtros.hasta) {
    query += " AND fecha_hora <= ?";
    params.push(filtros.hasta);
  }

  if (filtros.activo !== undefined && filtros.activo !== "") {
    query += " AND t.activo = ?";
    params.push(filtros.activo);
  }

  // PAGINADO REAL:
  query += " ORDER BY t.fecha_hora DESC LIMIT ? OFFSET ?";
  params.push(limit, offset);

  const [rows] = await pool.query(query, params);
  return rows;
};
exports.contarTickets = async (filtros) => {
  let query = `
    SELECT COUNT(*) AS total
    FROM Ticket t 
    WHERE 1=1
  `;

  const params = [];

  if (filtros.estado) {
    query += " AND estado = ?";
    params.push(filtros.estado);
  }

  if (filtros.prioridad) {
    query += " AND prioridad = ?";
    params.push(filtros.prioridad);
  }

  if (filtros.id_usuario) {
    query += " AND id_usuario = ?";
    params.push(filtros.id_usuario);
  }

  if (filtros.desde) {
    query += " AND fecha_hora >= ?";
    params.push(filtros.desde);
  }

  if (filtros.hasta) {
    query += " AND fecha_hora <= ?";
    params.push(filtros.hasta);
  }

  if (filtros.activo !== undefined && filtros.activo !== "") {
    query += " AND activo = ?";
    params.push(filtros.activo);
  }

  const [rows] = await pool.query(query, params);
  return rows[0].total;
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
// Método para eliminar un ticket
exports.eliminarTicket = async (id_ticket) => {
  await pool.query('DELETE FROM Ticket WHERE id_ticket = ?', [id_ticket]);
};