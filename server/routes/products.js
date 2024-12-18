const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
});

// Search products by name or category
router.get('/search', async (req, res) => {
  const { query } = req.query;
  try {
    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } },
      ],
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error searching products', error });
  }
});

module.exports = router;
