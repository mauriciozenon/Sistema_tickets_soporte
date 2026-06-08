const usuarioModel = require('../models/usuarioModel');
const emailService = require('./emailService');

function generarCodigo() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

exports.enviarCodigo = async (email) => {
  const usuario = await usuarioModel.obtenerUsuarioPorEmail(email);
  if (!usuario) throw new Error('Usuario no encontrado');

  const codigo = generarCodigo();
  const expiracion = new Date(Date.now() + 10 * 60 * 1000);

  await usuarioModel.guardarCodigoVerificacion(usuario.id_usuario, codigo, expiracion);
  await emailService.enviarCodigo(email, codigo);

  return { mensaje: 'Código enviado al correo' };
};

exports.verificarCodigo = async (email, codigo) => {
  const usuario = await usuarioModel.obtenerUsuarioPorEmail(email);
  if (!usuario) throw new Error('Usuario no encontrado');

  if (usuario.verificado) throw new Error('La cuenta ya está verificada');

  if (!usuario.codigo_verificacion || !usuario.codigo_expiracion) {
    throw new Error('No hay código pendiente. Solicitá uno nuevo.');
  }

  if (new Date() > new Date(usuario.codigo_expiracion)) {
    throw new Error('El código expiró. Solicitá uno nuevo.');
  }

  if (usuario.codigo_verificacion !== codigo) {
    throw new Error('Código incorrecto');
  }

  await usuarioModel.verificarUsuario(usuario.id_usuario);
  return { mensaje: 'Cuenta verificada correctamente' };
};
