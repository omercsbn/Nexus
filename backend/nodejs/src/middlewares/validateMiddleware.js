const { body, validationResult } = require('express-validator');

// Kullanıcı kayıt doğrulama
const registerValidation = [
    body('email').isEmail().withMessage('Geçersiz e-posta adresi'),
    body('password').isLength({ min: 6 }).withMessage('Şifre en az 6 karakter uzunluğunda olmalıdır'),
    body('name').isLength({ min: 3 }).withMessage('İsim en az 3 karakter uzunluğunda olmalıdır'),
];

// Kullanıcı giriş doğrulama
const loginValidation = [
    body('email').isEmail().withMessage('Geçersiz e-posta adresi'),
    body('password').isLength({ min: 6 }).withMessage('Şifre en az 6 karakter uzunluğunda olmalıdır'),
];

// Kullanıcı profil güncelleme doğrulama
const updateProfileValidation = [
    body('name').optional().isLength({ min: 3 }).withMessage('İsim en az 3 karakter uzunluğunda olmalıdır'),
    body('email').optional().isEmail().withMessage('Geçersiz e-posta adresi'),
    body('role').optional().isIn(['user', 'admin']).withMessage('Geçersiz rol') // Rol doğrulama
];

// Belirli bir rolün kabul edilip edilmediğini doğrulama
const validateRole = (allowedRoles) => {
    return (req, res, next) => {
        const userRole = req.body.role; // veya req.user.role, rol bilgisi nasıl sağlanıyorsa
        if (!allowedRoles.includes(userRole)) {
            return res.status(403).json({
                message: 'Bu rol için erişim izni verilmedi'
            });
        }
        next();
    };
};

const validate = (validations) => {
    return async (req, res, next) => {
        await Promise.all(validations.map(validation => validation.run(req)));
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: 'Veri doğrulama hatası',
                errors: errors.array()
            });
        }
        next();
    };
};

module.exports = {
    registerValidation,
    loginValidation,
    updateProfileValidation,
    validate,
    validateRole
};
