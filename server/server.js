const express = require('express');
const connectDB = require('./config/db');
const productRoutes = require('./routes/products');
const cors = require('cors');
const bodyParser = require('body-parser');


require('dotenv').config();
connectDB();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
