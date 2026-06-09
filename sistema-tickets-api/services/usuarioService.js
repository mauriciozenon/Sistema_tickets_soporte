const usuarioModel = require('../models/usuarioModel');
const bcrypt = require('bcryptjs');
const verificacionService = require('./verificacionService');

exports.crearUsuario = async (datos) => {
  const { nombre, email, rol, password } = datos;
  const password_hash = await bcrypt.hash(password, 10);

  if (!nombre || !email || !rol || !password) {
    throw new Error('Faltan campos obligatorios');
  }

  const resultado = await usuarioModel.insertarUsuario(nombre, email, rol, password_hash);

  try {
    await verificacionService.enviarCodigo(email);
  } catch (err) {
    console.error('Error al enviar código de verificación:', err.message);
  }

  return resultado;
};

exports.obtenerUsuarios = async () => {
  return await usuarioModel.listarUsuarios();
};

exports.actualizarUsuario = async (id_usuario, campos) => {
  if (campos.password) {
    campos.password_hash = await bcrypt.hash(campos.password, 10);
    delete campos.password;
  }
  return await usuarioModel.actualizarUsuario(id_usuario, campos);
};

exports.eliminarUsuario = async (id_usuario) => {
  return await usuarioModel.eliminarUsuario(id_usuario);
};