const usuarioModel = require('../models/usuarioModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (email, password) => {
  const usuario = await usuarioModel.obtenerUsuarioPorEmail(email);
  if (!usuario) throw new Error('Credenciales inválidas');

  const valido = await bcrypt.compare(password, usuario.password_hash);
  if (!valido) throw new Error('Credenciales inválidas');

  const token = jwt.sign(
    { id_usuario: usuario.id_usuario, rol: usuario.rol },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  return { token, usuario: { id_usuario: usuario.id_usuario, nombre: usuario.nombre, rol: usuario.rol } };
};
