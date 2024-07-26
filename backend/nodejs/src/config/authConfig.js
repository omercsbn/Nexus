// authconfig.js
require('dotenv').config({ path: __dirname + '/../.env' });

const config = {
    // JWT ayarları
    JWT_SECRET: process.env.JWT_SECRET || 'defaultSecretKeyForJWT',
    JWT_EXPIRATION: process.env.JWT_EXPIRATION || '1h',

    // Diğer ayarları buraya ekleyebilirsiniz (örneğin, token yenileme süresi, algoritma vb.)
    JWT_ALGORITHM: process.env.JWT_ALGORITHM || 'HS256',

    // İzin verilen kaynaklar
    CORS_ALLOWED_ORIGINS: process.env.CORS_ALLOWED_ORIGINS ? process.env.CORS_ALLOWED_ORIGINS.split(',') : ['*'],

    // Hata mesajları
    ERROR_MESSAGES: {
        INVALID_CREDENTIALS: 'Geçersiz e-posta veya şifre',
        TOKEN_EXPIRED: 'Token süresi dolmuş',
        TOKEN_INVALID: 'Geçersiz token',
        USER_NOT_FOUND: 'Kullanıcı bulunamadı'
    },

    // Diğer yapılandırma ayarları
    PORT: process.env.PORT || 3000
};

module.exports = config;
