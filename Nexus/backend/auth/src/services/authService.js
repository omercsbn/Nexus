const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/authConfig');

const register = async (email, password) => {
    let user = await User.findOne({ email });
    if (user) {
        throw new Error('User already exists');
    }

    user = new User({ email, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
        user: { id: user.id }
    };

    const token = jwt.sign(payload, authConfig.jwtSecret, {
        expiresIn: authConfig.jwtExpiration
    });

    return token;
};

const login = async (email, password) => {
    let user = await User.findOne({ email });
    if (!user) {
        throw new Error('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }

    const payload = {
        user: { id: user.id }
    };

    const token = jwt.sign(payload, authConfig.jwtSecret, {
        expiresIn: authConfig.jwtExpiration
    });

    return token;
};

module.exports = {
    register,
    login
};
