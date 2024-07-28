const express = require('express');
const { check, validationResult } = require('express-validator');
const authController = require('../controllers/authController');
const validate = require('../middlewares/validationMiddleware');

const router = express.Router();

router.post(
    '/register',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
        check('name', 'Name is required').not().isEmpty(),
        check('surname', 'Surname is required').not().isEmpty(),
        check('phone', 'Phone number is required').not().isEmpty()
    ],
    validate,
    authController.register
);

router.post(
    '/login',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists()
    ],
    validate,
    authController.login
);

module.exports = router;
