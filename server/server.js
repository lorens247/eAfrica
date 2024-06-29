const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');

const app = express();

// Load environment variables
require('dotenv').config();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // Parse incoming JSON requests

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/portfolio', portfolioRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
