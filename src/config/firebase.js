const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const keyPath = process.env.FIREBASE_KEY_PATH;

if (!keyPath) {
  throw new Error("A variável FIREBASE_KEY_PATH não foi encontrada no arquivo .env");
}

const resolvedPath = path.resolve(keyPath);

if (!fs.existsSync(resolvedPath)) {
  throw new Error(`Arquivo de chave do Firebase não encontrado no caminho: ${resolvedPath}`);
}

const serviceAccount = require(resolvedPath);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();
module.exports = db;