const Product = require('../models/productModel');

exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, stock } = req.body;

        const product = new Product({
            name,
            description,
            price,
            stock
        });

        await product.save();
        res.status(201).json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
