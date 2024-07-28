const Product = require('../models/productModel');

exports.createProduct = async (productData) => {
    const product = new Product(productData);
    await product.save();
    return product;
};

exports.getProducts = async () => {
    const products = await Product.find();
    return products;
};
