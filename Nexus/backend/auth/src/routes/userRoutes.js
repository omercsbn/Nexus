const express = require('express');
const { check } = require('express-validator');
const userController = require('../controllers/userController');
const validate = require('../middlewares/validationMiddleware');
const auth = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', auth, userController.getUser);

router.put(
    '/',
    [
        auth,
        check('name', 'Name is required').optional().not().isEmpty(),
        check('surname', 'Surname is required').optional().not().isEmpty(),
        check('phone', 'Phone number is required').optional().not().isEmpty()
    ],
    validate,
    userController.updateUser
);

router.delete('/', auth, userController.deleteUser);

module.exports = router;
