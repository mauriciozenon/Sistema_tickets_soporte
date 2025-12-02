const pool = require('../config/db');

exports.insertarUsuario = async (nombre, email, rol, password_hash) => {
  const [result] = await pool.query(
    'INSERT INTO Usuario (nombre, email, rol, password_hash) VALUES (?, ?, ?, ?)',
    [nombre, email, rol, password_hash]
  );
  return { usuario: { id_usuario: result.insertId, nombre, email, rol }};
};

exports.listarUsuarios = async () => {
  const [rows] = await pool.query('SELECT id_usuario, nombre, email, rol FROM Usuario');
  return rows;
};

exports.obtenerUsuarioLogin = async (email) => {
  const [rows] = await pool.query('SELECT id_usuario, nombre, email, rol, password_hash FROM Usuario WHERE email = ?', [email]);
  return rows[0];
};

exports.obtenerUsuarioPorEmail = async (email) => {
  const [rows] = await pool.query('SELECT id_usuario, nombre, email, rol  FROM Usuario WHERE email = ?', [email]);
  return rows[0];
};
exports.obtenerUsuarioPorId = async (id_usuario) => {
  const [rows] = await pool.query(
    `SELECT id_usuario, nombre, email, rol FROM Usuario WHERE id_usuario = ?`,
    [id_usuario]
  );
  return rows[0];
};
exports.actualizarUsuario = async (id_usuario, campos) => {
  const camposSQL = Object.keys(campos).map(c => `${c} = ?`).join(', ');
  const valores = Object.values(campos);
  valores.push(id_usuario);

  await pool.query(
    `UPDATE Usuario SET ${camposSQL} WHERE id_usuario = ?`,
    valores
  );
};

exports.eliminarUsuario = async (id_usuario) => {
  await pool.query(`DELETE FROM Usuario WHERE id_usuario = ?`, [id_usuario]);
};

