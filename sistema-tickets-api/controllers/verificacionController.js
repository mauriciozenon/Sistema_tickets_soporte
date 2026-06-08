const verificacionService = require('../services/verificacionService');

exports.enviarCodigo = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email requerido' });
    const resultado = await verificacionService.enviarCodigo(email);
    res.json(resultado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.verificarCodigo = async (req, res) => {
  try {
    const { email, codigo } = req.body;
    if (!email || !codigo) return res.status(400).json({ error: 'Email y código requeridos' });
    const resultado = await verificacionService.verificarCodigo(email, codigo);
    res.json(resultado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
