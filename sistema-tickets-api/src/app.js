const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas base (las vamos a crear después)
const usuarioRoutes = require('../routes/usuarioRoutes');
// const ticketRoutes = require('../routes/ticketRoutes');
// const historialRoutes = require('../routes/historialRoutes');

app.use('/api/usuarios', usuarioRoutes);
// app.use('/api/tickets', ticketRoutes);
// app.use('/api/historial', historialRoutes);

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});