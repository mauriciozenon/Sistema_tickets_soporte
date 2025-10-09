const pool = require('./src/config/db');

async function testConnection() {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS resultado');
    console.log('Conexión exitosa:', rows[0].resultado);
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
  }
}

testConnection();