const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Kullanıcı kaydı
router.post('/register', authController.register);

// Kullanıcı girişi
router.post('/login', authController.login);

// Kullanıcı profil güncelleme
router.put('/profile', authController.verifyToken, authController.updateProfile);

module.exports = router;
