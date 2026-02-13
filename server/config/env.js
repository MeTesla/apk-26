require('dotenv').config();

const config = {
    // JWT Secret
    SECRET_KEY: process.env.SECRET_KEY,
    
    // Base de données
    MONGODB_URI: process.env.MONGODB_URI,
    
    // Email (SendGrid)
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
    EMAIL_FROM: process.env.EMAIL_FROM || 'noreply@euduka.com',
    
    // Client URLs
    CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5500',
    
    // Server
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    
    // CORS Origins
    CORS_ORIGINS: (process.env.CORS_ORIGINS || 'https://eudeka.onrender.com,http://127.0.0.1:5500,http://localhost:3000,https://euduka.page.gd,http://localhost:5500').split(','),
    
    // Firebase (backend)
    FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL || '',
    FIREBASE_SERVICE_ACCOUNT_PATH: process.env.FIREBASE_SERVICE_ACCOUNT_PATH || './config/firebase-service-account.json',
};

// Valider les variables critiques
if (!config.SECRET_KEY) {
    console.warn('⚠️  WARNING: SECRET_KEY not set in .env, using default value');
}

if (!config.MONGODB_URI) {
    console.warn('⚠️  WARNING: MONGODB_URI not set in .env');
}

if (config.FIREBASE_DATABASE_URL && !config.FIREBASE_DATABASE_URL) {
    console.warn('⚠️  WARNING: FIREBASE_DATABASE_URL not set in .env (optional)');
}

if (config.NODE_ENV === 'production') {
    // En production, certaines variables sont obligatoires
    if (!process.env.SECRET_KEY) {
        throw new Error('❌ ERROR: SECRET_KEY must be set in .env for production');
    }
    if (!process.env.MONGODB_URI) {
        throw new Error('❌ ERROR: MONGODB_URI must be set in .env for production');
    }
    if (!process.env.SENDGRID_API_KEY) {
        throw new Error('❌ ERROR: SENDGRID_API_KEY must be set in .env for production');
    }
}

module.exports = config;
