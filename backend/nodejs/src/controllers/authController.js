const authService = require('../services/authService');

// Kullanıcı kaydı
exports.register = async (req, res) => {
    try {
        const user = await authService.registerUser(req.body);
        res.status(201).json({
            message: 'Kullanıcı başarıyla oluşturuldu',
            user
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// Kullanıcı girişi
exports.login = async (req, res) => {
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
    try {
        const user = await authService.updateUser(req.user.id, req.body);
        res.status(200).json({
            message: 'Profil güncellendi',
            user
        });
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

// Kullanıcıyı yetkilendirme (middleware)
exports.verifyToken = async (req, res, next) => {
    try {
        const user = await authService.verifyToken(req.headers.authorization);
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({
            message: 'Geçersiz token'
        });
    }
};
