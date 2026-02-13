/**
 * Configuration d'environnement centralisée
 * À déploiement : modifier API_URL ou passer par variable d'environnement
 df*/ 
 
// Déterminer l'URL de base selon l'environnement
const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
const API_URL = 'https://apk-26-backend.onrender.com' //isDevelopment ? 'http://localhost:3000' : 'https://euduka.vercel.app'

export { API_URL }
