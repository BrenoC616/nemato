// Importando Firebase e Firestore
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js";
import CONFIG from "../config.js";

const firebaseConfig = {
  apiKey: CONFIG.API_KEY,
  appId: CONFIG.APP_ID,
  authDomain: CONFIG.AUTH_DOMAIN,
  measurementId: CONFIG.MEASUREMENT_ID,
  messagingSenderId: CONFIG.MESSAGING_SENDER_ID,
  projectId: CONFIG.PROJECT_ID,
  storageBucket: CONFIG.STORAGE_BUCKET,
};

export { initializeApp, firebaseConfig };
