const express = require('express');
const authController = require('../controllers/authController');
const { validate, registerValidation, loginValidation, updateProfileValidation, validateRole } = require('../middlewares/validateMiddleware');

const router = express.Router();

// Kullanıcı kaydı
router.post(
    '/register',
    validate(registerValidation),  // İstek verilerini doğrulama
    validateRole(['user']), // admin rolü varsa erişim izni verilmez
    authController.register
);

// Kullanıcı girişi
router.post(
    '/login',
    validate(loginValidation),  // İstek verilerini doğrulama
    authController.login
);

// Kullanıcı profil güncelleme
router.put(
    '/profile',
    authController.verifyToken,  // Token doğrulama ve kullanıcı yetkilendirme
    validate(updateProfileValidation),  // İstek verilerini doğrulama
    validateRole(['user']),  // Rol doğrulama
    authController.updateProfile
);

module.exports = router;
