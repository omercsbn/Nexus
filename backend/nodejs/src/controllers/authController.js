const authService = require('../services/authService');
const { validationResult } = require('express-validator');

// Kullanıcı kaydı
exports.register = async (req, res) => {
    try {
        // Gerekli alanların kontrolü
        const { name, email, password } = req.body;
        if (!name || !email || !password ) {
            return res.status(400).json({
                message: 'Eksik alanlar. Tüm alanların doldurulduğundan emin olun.'
            });
        }
        
        const user = await authService.registerUser(req.body);
        res.status(201).json({
            message: 'Kullanıcı başarıyla oluşturuldu',
            user
        });
    } catch (error) {
        if (error.code === 11000) {  // MongoDB benzersiz hata kodu
            return res.status(400).json({
                message: 'Bu e-posta veya kullanıcı adı zaten mevcut'
            });
        }
        res.status(400).json({
            message: error.message
        });
    }
};


// Kullanıcı girişi
exports.login = async (req, res) => {
    // Hata kontrolü
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: 'Geçersiz giriş verileri',
            errors: errors.array()
        });
    }

    try {
        const { token, user } = await authService.loginUser(req.body);
        res.status(200).json({
            message: 'Giriş başarılı',
            token,
            user
        });
    } catch (error) {
        res.status(401).json({
            message: error.message
        });
    }
};

// Kullanıcı bilgilerini güncelleme
exports.updateProfile = async (req, res) => {
    // Yetkili kullanıcı kontrolü
    if (!req.user) {
        return res.status(401).json({
            message: 'Yetkilendirilmiş kullanıcı bulunamadı'
        });
    }

    try {
        const user = await authService.updateUser(req.user.id, req.body);
        res.status(200).json({
            message: 'Profil başarıyla güncellendi',
            user
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// Token yenileme
exports.refreshToken = async (req, res) => {
    try {
        const { token } = req.body;
        const newToken = await authService.refreshToken(token);
        res.status(200).json({
            message: 'Token başarıyla yenilendi',
            token: newToken
        });
    } catch (error) {
        res.status(401).json({
            message: 'Token yenileme hatası: ' + error.message
        });
    }
};

// Kullanıcıyı yetkilendirme (middleware)
exports.verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            message: 'Geçersiz token'
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const user = await authService.verifyToken(token);
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({
            message: 'Token doğrulama hatası: ' + error.message
        });
    }
};
