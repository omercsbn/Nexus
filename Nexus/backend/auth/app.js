const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');
const orderRoutes = require('./src/routes/orderRoutes');
const paymentRoutes = require('./src/routes/paymentRoutes');
const productRoutes = require('./src/routes/productRoutes');
const bankAccountRoutes = require('./src/routes/bankAccountRoutes');
const errorHandler = require('./src/middlewares/errorHandler');

dotenv.config();

const app = express();
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);  // Bağlantı başarısız olduğunda uygulamayı sonlandırır
    });

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/products', productRoutes);
app.use('/api/bank-accounts', bankAccountRoutes);

// Hata yakalama middleware'i
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
