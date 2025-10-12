const usuarioModel = require('../models/usuarioModel');
const bcrypt = require('bcrypt');

exports.crearUsuario = async (datos) => {
    const { nombre, email, rol, password } = datos;
    const password_hash = await bcrypt.hash(password, 10);

    if (!nombre || !email || !rol || !password) {
        throw new Error('Faltan campos obligatorios');
    }

    return await usuarioModel.insertarUsuario(nombre, email, rol, password_hash);
};

exports.obtenerUsuarios = async () => {
    return await usuarioModel.listarUsuarios();
};

exports.iniciarSesion = async (datos) => {
    const { email, password } = datos;
    const usuarioExistente = await usuarioModel.obtenerUsuarioLogin(email);
    if (usuarioExistente.length === 0 || !usuarioExistente) {
        throw new Error('Usuario no encontrado');
    }

    const password_hash = await bcrypt.hash(password, 10);

    if (!nombre || !email || !rol || !password) {
        throw new Error('Faltan campos obligatorios');
    }

    return await usuarioModel.insertarUsuario(nombre, email, rol, password_hash);
};