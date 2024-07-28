const jwt = require('jsonwebtoken');
const authConfig = require('../config/authConfig');

const generateToken = (user) => {
    const payload = {
        user: {
            id: user.id
        }
    };

    return jwt.sign(payload, authConfig.jwtSecret, {
        expiresIn: authConfig.jwtExpiration
    });
};

module.exports = {
    generateToken
};
