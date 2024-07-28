const Order = require('../models/orderModel');

exports.createOrder = async (orderData) => {
    const order = new Order(orderData);
    await order.save();
    return order;
};

exports.getOrders = async (userId) => {
    const orders = await Order.find({ userId });
    return orders;
};
