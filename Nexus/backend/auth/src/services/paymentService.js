const Payment = require('../models/paymentModel');

exports.createPayment = async (paymentData) => {
    const payment = new Payment(paymentData);
    await payment.save();
    return payment;
};

exports.getPayments = async () => {
    const payments = await Payment.find();
    return payments;
};
