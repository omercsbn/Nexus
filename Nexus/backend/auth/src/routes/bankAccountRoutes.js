const express = require('express');
const { check } = require('express-validator');
const bankAccountController = require('../controllers/bankAccountController');
const validate = require('../middlewares/validationMiddleware');
const auth = require('../middlewares/authMiddleware');

const router = express.Router();

router.post(
    '/',
    [
        auth,
        check('accountNumber', 'Account number is required').not().isEmpty(),
        check('bankName', 'Bank name is required').not().isEmpty(),
        check('balance', 'Balance is required').isFloat({ gt: 0 })
    ],
    validate,
    bankAccountController.createBankAccount
);

router.get('/', auth, bankAccountController.getBankAccounts);

router.put(
    '/:id',
    [
        auth,
        check('accountNumber', 'Account number is required').optional().not().isEmpty(),
        check('bankName', 'Bank name is required').optional().not().isEmpty(),
        check('balance', 'Balance is required').optional().isFloat({ gt: 0 })
    ],
    validate,
    bankAccountController.updateBankAccount
);

router.delete('/:id', auth, bankAccountController.deleteBankAccount);

module.exports = router;
