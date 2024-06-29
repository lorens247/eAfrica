const express = require('express');
const { getPortfolio, addPortfolioItem } = require('../controllers/portfolioController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, getPortfolio);
router.post('/', authMiddleware, addPortfolioItem);

module.exports = router;
