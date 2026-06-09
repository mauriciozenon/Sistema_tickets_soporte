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
  const [rows] = await pool.query('SELECT id_usuario, nombre, email, rol, password_hash, verificado FROM Usuario WHERE email = ?', [email]);
  return rows[0];
};

exports.guardarCodigoVerificacion = async (id_usuario, codigo, expiracion) => {
  await pool.query(
    'UPDATE Usuario SET codigo_verificacion = ?, codigo_expiracion = ? WHERE id_usuario = ?',
    [codigo, expiracion, id_usuario]
  );
};

exports.verificarUsuario = async (id_usuario) => {
  await pool.query(
    'UPDATE Usuario SET verificado = 1, codigo_verificacion = NULL, codigo_expiracion = NULL WHERE id_usuario = ?',
    [id_usuario]
  );
};

exports.obtenerUsuarioPorEmail = async (email) => {
  const [rows] = await pool.query('SELECT id_usuario, nombre, email, rol, verificado, codigo_verificacion, codigo_expiracion FROM Usuario WHERE email = ?', [email]);
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

