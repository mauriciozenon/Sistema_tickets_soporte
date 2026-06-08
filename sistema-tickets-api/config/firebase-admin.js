const admin = require('firebase-admin');

try {
  const serviceAccount = require('./serviceAccountKey.json');
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  }
} catch (err) {
  console.warn('⚠ serviceAccountKey.json no encontrado. Firebase deshabilitado.');
}

module.exports = admin;