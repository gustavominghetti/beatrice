const admin = require('firebase-admin');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const keyPath = process.env.FIREBASE_KEY_PATH;

if (!keyPath) {
  throw new Error("A variável FIREBASE_KEY_PATH não foi encontrada no arquivo .env");
}

const serviceAccount = require(path.resolve(keyPath));

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();
module.exports = db;