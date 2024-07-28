const express = require('express');
const { check } = require('express-validator');
const orderController = require('../controllers/orderController');
const validate = require('../middlewares/validationMiddleware');
const auth = require('../middlewares/authMiddleware');

const router = express.Router();

router.post(
    '/',
    [
        auth,
        check('productId', 'Product ID is required').not().isEmpty(),
        check('quantity', 'Quantity is required').isInt({ gt: 0 }),
        check('price', 'Price is required').isFloat({ gt: 0 }),
        check('status', 'Status is required').not().isEmpty()
    ],
    validate,
    orderController.createOrder
);

router.get('/', auth, orderController.getOrders);

module.exports = router;
