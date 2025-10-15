const usuarioService = require('../services/usuarioService');

exports.registrarUsuario = async (req, res) => {
  try {
    const nuevoUsuario = await usuarioService.crearUsuario(req.body);
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    console.error('Error en controlador:', error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};

exports.listarUsuarios = async (req, res) => {
  try {
    const usuarios = await usuarioService.obtenerUsuarios();
    res.json(usuarios);
  } catch (error) {
    console.error('Error en controlador:', error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

exports.actualizarUsuario = async (req, res) => {
  try {
    await usuarioService.actualizarUsuario(req.params.id, req.body);
    res.json({ mensaje: 'Usuario actualizado' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.eliminarUsuario = async (req, res) => {
  try {
    await usuarioService.eliminarUsuario(req.params.id);
    res.json({ mensaje: 'Usuario eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.iniciarSesion = async (req, res) => {
  try {
    const usuario = await usuarioService.crearUsuario(req.body);
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    console.error('Error en controlador:', error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};