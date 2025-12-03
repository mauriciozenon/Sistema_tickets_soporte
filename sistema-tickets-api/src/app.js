const express = require('express');
const cors = require('cors');
require('dotenv').config();
const usuarioService = require('../config/test-db');
const app = express();

// Middlewares

app.use(cors({
  origin: [
    'http://localhost:3020',
    'https://mauriciozenon.github.io'
  ],
  credentials: true
}));
app.use(express.json());

// Rutas
const usuarioRoutes = require('../routes/usuarioRoutes');
const ticketRoutes = require('../routes/ticketRoutes');
const historialRoutes = require('../routes/historialRoutes');
const errorHandler = require('../middleware/errorHandler');
const authRoutes = require('../routes/authRoutes');
const rolMiddleware = require('../middleware/rolMiddleware');


// Uso de rutas
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/historial', historialRoutes);
app.use('/api/auth', authRoutes);
app.use(errorHandler);

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
  console.log('intentando conexion: ');
  usuarioService.testConnection();
});