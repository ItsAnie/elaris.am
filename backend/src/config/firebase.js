const path = require("path");
const fs = require("fs");
const { initializeApp, cert, getApps } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

// Firebase Web Configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || "AIzaSyDQg3dLVupUFphpBL_cg0mfru2X1ZBo",
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || "luxe-invitation.firebaseapp.com",
  projectId: process.env.FIREBASE_PROJECT_ID || "luxe-invitation",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "luxe-invitation.firebasestorage.app",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "704051142875",
  appId: process.env.FIREBASE_APP_ID || "1:704051142875:web:3f6c38752cb0e2bfeaecfe",
  measurementId: process.env.FIREBASE_MEASUREMENT_ID || "G-LH8PEWTBS7"
};

let credential;

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  try {
    const parsed = typeof process.env.FIREBASE_SERVICE_ACCOUNT === 'string'
      ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
      : process.env.FIREBASE_SERVICE_ACCOUNT;
    credential = cert(parsed);
  } catch (err) {
    console.error("Failed to parse FIREBASE_SERVICE_ACCOUNT JSON:", err);
  }
} else if (process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
  const privateKey = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n');
  credential = cert({
    projectId: process.env.FIREBASE_PROJECT_ID || firebaseConfig.projectId,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: privateKey,
  });
} else {
  const localKeyPath = path.resolve(__dirname, "../../config/serviceAccountKey.json");
  if (fs.existsSync(localKeyPath)) {
    const serviceAccount = require(localKeyPath);
    credential = cert(serviceAccount);
  }
}

if (getApps().length === 0) {
  if (credential) {
    initializeApp({
      credential,
      projectId: firebaseConfig.projectId,
      storageBucket: firebaseConfig.storageBucket,
    });
  } else {
    initializeApp({
      projectId: firebaseConfig.projectId,
    });
  }
}

const db = getFirestore();

// Support both const db = require('./firebase') and const { db, firebaseConfig } = require('./firebase')
module.exports = db;
module.exports.db = db;
module.exports.firebaseConfig = firebaseConfig;