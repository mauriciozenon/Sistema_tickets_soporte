const pool = require('../config/db');

// if (!nombre || !email || !rol || !password_hash) {
//   return res.status(400).json({ error: 'Faltan campos obligatorios' });
// }
// Registrar usuario
exports.registrarUsuario = async (req, res) => {
  const { nombre, email, rol, password_hash } = req.body;

  try {
    console.log('Datos recibidos:', nombre, email, rol);
    console.log('Db pool:', pool); 
    console.log('Conectando a la base de datos...');
    console.log('pool config:', pool.config);
    const [result] = await pool.query(
      'INSERT INTO Usuario (nombre, email, rol, password_hash) VALUES (?, ?, ?, ?)',
      [nombre, email, rol, password_hash]
    );

    res.status(201).json({ mensaje: 'Usuario creado', id: result.insertId });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};

// Listar usuarios
exports.listarUsuarios = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id_usuario, nombre, email, rol FROM Usuario');
    res.json(rows);
  } catch (error) {
    console.error('Error al listar usuarios:', error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};