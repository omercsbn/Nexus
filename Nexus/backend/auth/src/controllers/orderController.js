const Order = require('../models/orderModel');
const User = require('../models/userModel');

exports.createOrder = async (req, res) => {
    try {
        const { productId, quantity, price, status } = req.body;
        const userId = req.user.id;

        const order = new Order({
            userId,
            productId,
            quantity,
            price,
            status
        });

        await order.save();
        res.status(201).json(order);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        const orders = await Order.find({ userId });
        res.json(orders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
