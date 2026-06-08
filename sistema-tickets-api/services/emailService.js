const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.enviarCodigo = async (email, codigo) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Código de verificación - Sistema de Tickets',
    html: `
      <h2>Verificá tu cuenta</h2>
      <p>Tu código de verificación es:</p>
      <h1 style="letter-spacing:8px; color:#4f46e5;">${codigo}</h1>
      <p>Expira en 10 minutos.</p>
    `
  });
};
