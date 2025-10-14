const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { usuario, contraseña } = req.body;

  // Simulación: usuario hardcodeado
  if (usuario === 'admin' && contraseña === '1234') {
    const payload = {
      id_usuario: 1,
      rol: 'admin'
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    return res.json({ token });
  }

  res.status(401).json({ error: 'Credenciales inválidas' });
};
