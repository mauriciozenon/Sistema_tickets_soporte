const pool = require('./db');

exports.testConnection = async () => {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS resultado');
    console.log('Conexión exitosa:', rows[0].resultado);
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
  }
}
