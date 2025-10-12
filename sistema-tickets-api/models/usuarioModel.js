const pool = require('../config/db');

exports.insertarUsuario = async (nombre, email, rol, password_hash) => {
  const [result] = await pool.query(
    'INSERT INTO Usuario (nombre, email, rol, password_hash) VALUES (?, ?, ?, ?)',
    [nombre, email, rol, password_hash]
  );
  return { mensaje: 'Usuario creado', id: result.insertId };
};

exports.listarUsuarios = async () => {
  const [rows] = await pool.query('SELECT id_usuario, nombre, email, rol FROM Usuario');
  return rows;
};

exports.obtenerUsuarioLogin = async (email) => {
  const [rows] = await pool.query('SELECT id_usuario, nombre, email, rol, password_hash FROM Usuario WHERE email = ?', [email]);
  return rows;
};

exports.obtenerUsuarioPorEmail = async (email) => {
  const [rows] = await pool.query('SELECT id_usuario, nombre, email, rol  FROM Usuario WHERE email = ?', [email]);
  return rows;
};
