module.exports = (err, req, res, next) => {
  console.error('Error capturado:', err);

  const status = err.status || 500;
  const mensaje = err.message || 'Error interno del servidor';

  res.status(status).json({ error: mensaje });
};