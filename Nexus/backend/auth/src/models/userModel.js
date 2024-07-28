const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
    street: String,
    city: String,
    state: String,
    country: String,
    zip: String
});

const OrderSchema = new mongoose.Schema({
    productId: mongoose.Schema.Types.ObjectId,
    quantity: Number,
    price: Number,
    status: String,
    orderedAt: { type: Date, default: Date.now }
});

const CartItemSchema = new mongoose.Schema({
    productId: mongoose.Schema.Types.ObjectId,
    quantity: Number
});

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    address: [AddressSchema],
    phone: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['customer', 'admin'],
        default: 'customer'
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    cart: [CartItemSchema],
    wishlist: [mongoose.Schema.Types.ObjectId],
    orders: [OrderSchema]
});

module.exports = mongoose.model('User', UserSchema);
