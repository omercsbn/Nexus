const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Kullanıcı kaydı
exports.registerUser = async (userData) => {
    try {
        // Kullanıcı e-posta kontrolü
        const existingUser = await User.findOne({ email: userData.email });
        if (existingUser) {
            throw new Error('Bu e-posta adresi zaten kullanılıyor');
        }

        // Şifreyi hashleme
        const hashedPassword = await bcrypt.hash(userData.password, 12);
        const newUser = new User({
            ...userData,
            password: hashedPassword
        });

        // Kullanıcıyı kaydetme
        const savedUser = await newUser.save();
        return savedUser;
    } catch (error) {
        console.error('Kullanıcı kaydı hatası:', error);
        throw new Error('Kullanıcı kaydı başarısız', error);
    }
};

// Kullanıcı girişi
exports.loginUser = async (loginData) => {
    try {
        const { email, password } = loginData;

        // Kullanıcıyı bulma
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Geçersiz e-posta veya şifre');
        }

        // Şifreyi doğrulama
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Geçersiz e-posta veya şifre');
        }

        // Token oluşturma
        const token = user.generateAuthToken();
        return { token, user };
    } catch (error) {
        console.error('Kullanıcı girişi hatası:', error);
        throw new Error('Giriş işlemi başarısız');
    }
};

// Kullanıcı güncelleme
exports.updateUser = async (userId, updateData) => {
    try {
        // Kullanıcıyı güncelleme
        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true });
        if (!updatedUser) {
            throw new Error('Kullanıcı bulunamadı');
        }
        return updatedUser;
    } catch (error) {
        console.error('Kullanıcı güncelleme hatası:', error);
        throw new Error('Kullanıcı güncellenemedi');
    }
};

// Token doğrulama
exports.verifyToken = async (token) => {
    try {
        if (!token) throw new Error('Token bulunamadı');

        // Token doğrulama
        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
        if (!decoded) throw new Error('Geçersiz token');

        // Kullanıcıyı bulma
        const user = await User.findById(decoded.id);
        if (!user) throw new Error('Kullanıcı bulunamadı');

        return user;
    } catch (error) {
        console.error('Token doğrulama hatası:', error);
        throw new Error('Token doğrulama başarısız');
    }
};

// Kullanıcı şifre güncelleme
exports.changePassword = async (userId, oldPassword, newPassword) => {
    try {
        const user = await User.findById(userId);
        if (!user) throw new Error('Kullanıcı bulunamadı');

        const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
        if (!isPasswordValid) throw new Error('Eski şifre yanlış');

        // Yeni şifreyi hashleme
        const hashedNewPassword = await bcrypt.hash(newPassword, 12);
        user.password = hashedNewPassword;
        
        await user.save();
        return user;
    } catch (error) {
        console.error('Şifre güncelleme hatası:', error);
        throw new Error('Şifre güncellenemedi');
    }
};
