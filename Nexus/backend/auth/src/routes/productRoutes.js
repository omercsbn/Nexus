const express = require('express');
const { check } = require('express-validator');
const productController = require('../controllers/productController');
const validate = require('../middlewares/validationMiddleware');
const auth = require('../middlewares/authMiddleware');

const router = express.Router();

router.post(
    '/',
    [
        auth,
        check('name', 'Name is required').not().isEmpty(),
        check('description', 'Description is required').not().isEmpty(),
        check('price', 'Price is required').isFloat({ gt: 0 }),
        check('stock', 'Stock is required').isInt({ gt: 0 })
    ],
    validate,
    productController.createProduct
);

router.get('/', productController.getProducts);

module.exports = router;
