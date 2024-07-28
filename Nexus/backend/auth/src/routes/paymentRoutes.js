const express = require('express');
const { check } = require('express-validator');
const paymentController = require('../controllers/paymentController');
const validate = require('../middlewares/validationMiddleware');
const auth = require('../middlewares/authMiddleware');

const router = express.Router();

router.post(
    '/',
    [
        auth,
        check('orderId', 'Order ID is required').not().isEmpty(),
        check('amount', 'Amount is required').isFloat({ gt: 0 }),
        check('paymentMethod', 'Payment method is required').not().isEmpty(),
        check('status', 'Status is required').not().isEmpty()
    ],
    validate,
    paymentController.createPayment
);

router.get('/', auth, paymentController.getPayments);

module.exports = router;
