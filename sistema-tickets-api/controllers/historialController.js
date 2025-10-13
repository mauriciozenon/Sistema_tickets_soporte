const historialService = require('../services/historialService');

exports.registrarHistorial = async (req, res) => {
  try {
    const resultado = await historialService.registrarHistorial(req.body);
    res.status(201).json(resultado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerHistorial = async (req, res) => {
  try {
    const { id_ticket } = req.params;
    const historial = await historialService.obtenerHistorial(id_ticket);
    res.json(historial);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};