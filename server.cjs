const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const cron = require('node-cron');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for gold price
let goldPricePerGram = 65.50; // Fallback price in USD per gram

// Function to fetch real-time gold price
async function fetchGoldPrice() {
  try {
    // For demo purposes, we'll simulate real-time data
    const mockPrice = 65.50 + (Math.random() - 0.5) * 5; // Simulate price fluctuation
    goldPricePerGram = Math.round(mockPrice * 100) / 100;
    console.log(`Gold price updated: $${goldPricePerGram}/gram`);
  } catch (error) {
    console.error('Error fetching gold price:', error.message);
    // Keep the previous price if API fails
  }
}

// Update gold price every 30 minutes
cron.schedule('*/30 * * * *', fetchGoldPrice);

// Initial gold price fetch
fetchGoldPrice();

// Root route - Welcome message
app.get('/', (req, res) => {
  res.json({
    message: 'Luxury Engagement Rings API Server',
    status: 'running',
    version: '1.0.0',
    endpoints: {
      products: '/api/products',
      goldPrice: '/api/gold-price'
    },
    frontend: 'http://localhost:5173'
  });
});

// Helper function to calculate product price
function calculatePrice(popularityScore, weight) {
  return Math.round(((popularityScore + 1) * weight * goldPricePerGram) * 100) / 100;
}

// Helper function to convert popularity score to 5-star rating
function convertToStarRating(popularityScore) {
  return Math.round((popularityScore * 5) * 10) / 10;
}

// Load products from JSON file
function loadProducts() {
  try {
    const productsData = fs.readFileSync(path.join(__dirname, 'products.json'), 'utf8');
    return JSON.parse(productsData);
  } catch (error) {
    console.error('Error loading products:', error);
    return [];
  }
}

// GET /api/products - Get all products with optional filtering
app.get('/api/products', (req, res) => {
  try {
    const rawProducts = loadProducts();
    
    // Calculate prices and star ratings for all products
    let products = rawProducts.map(product => ({
      ...product,
      price: calculatePrice(product.popularityScore, product.weight),
      starRating: convertToStarRating(product.popularityScore)
    }));

    // Apply filters if provided
    const { minPrice, maxPrice, minPopularity, maxPopularity } = req.query;

    if (minPrice) {
      products = products.filter(p => p.price >= parseFloat(minPrice));
    }
    if (maxPrice) {
      products = products.filter(p => p.price <= parseFloat(maxPrice));
    }
    if (minPopularity) {
      products = products.filter(p => p.popularityScore >= parseFloat(minPopularity));
    }
    if (maxPopularity) {
      products = products.filter(p => p.popularityScore <= parseFloat(maxPopularity));
    }

    res.json({
      success: true,
      data: products,
      goldPrice: goldPricePerGram,
      totalProducts: products.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching products',
      error: error.message
    });
  }
});

// GET /api/gold-price - Get current gold price
app.get('/api/gold-price', (req, res) => {
  res.json({
    success: true,
    goldPrice: goldPricePerGram,
    currency: 'USD',
    unit: 'per gram',
    lastUpdated: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Server accessible at http://localhost:${PORT}`);
  console.log(`API endpoints:`);
  console.log(`  GET /api/products - Get all products`);
  console.log(`  GET /api/gold-price - Get current gold price`);
  console.log(`  Filter params: minPrice, maxPrice, minPopularity, maxPopularity`);
});

// Handle server errors
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});