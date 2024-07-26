const User = require('../models/userModel');

// Kullanıcı kaydı
exports.registerUser = async (userData) => {
    const user = new User(userData);
    return await user.save();
};

// Kullanıcı girişi
exports.loginUser = async (loginData) => {
    const { email, password } = loginData;
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
        throw new Error('Geçersiz e-posta veya şifre');
    }

    const token = user.generateAuthToken();
    return { token, user };
};

// Kullanıcı güncelleme
exports.updateUser = async (userId, updateData) => {
    return await User.findByIdAndUpdate(userId, updateData, { new: true });
};

// Token doğrulama
exports.verifyToken = async (token) => {
    if (!token) throw new Error('Token bulunamadı');

    const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
    return await User.findById(decoded.id);
};
