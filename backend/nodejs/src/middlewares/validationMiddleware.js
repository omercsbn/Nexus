const Joi = require('joi');

// Kullanıcı kayıt doğrulama şeması
const registerSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().min(3).required(),
});

// Kullanıcı giriş doğrulama şeması
const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

// Kullanıcı profil güncelleme doğrulama şeması
const updateProfileSchema = Joi.object({
    name: Joi.string().min(3),
    email: Joi.string().email(),
});

module.exports = {
    registerSchema,
    loginSchema,
    updateProfileSchema
};
