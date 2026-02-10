const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
dotenv.config();
const app = express();
connectDB();
app.use(cors());
app.use(express.json());
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.get('/', (req, res) => {
    res.json({ message: 'AI Dropshipping API Server' });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
module.exports = app;