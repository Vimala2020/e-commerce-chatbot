const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });

const mongoose = require('mongoose');
const mockData = require('./mockData'); 
const Product = require('./models/product'); 

console.log('MongoDB URI:', process.env.MONGO_URI);


mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected');
    // Insert mock data
    Product.insertMany(mockData)
      .then((result) => {
        console.log(`Inserted ${result.length} products successfully`);
        mongoose.connection.close(); 
      })
      .catch((err) => {
        console.error('Error inserting mock data:', err);
        mongoose.connection.close();
      });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
