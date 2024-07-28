const Payment = require('../models/paymentModel');
const Order = require('../models/orderModel');

exports.createPayment = async (req, res) => {
    try {
        const { orderId, amount, paymentMethod, status } = req.body;

        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(400).json({ msg: 'Order not found' });
        }

        const payment = new Payment({
            orderId,
            amount,
            paymentMethod,
            status
        });

        await payment.save();
        res.status(201).json(payment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getPayments = async (req, res) => {
    try {
        const payments = await Payment.find();
        res.json(payments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
