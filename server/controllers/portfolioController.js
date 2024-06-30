const Portfolio = require('../models/Portfolio');

// Get user's portfolio
const getPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ user: req.user.id }).populate('user', ['name', 'email']);
    if (!portfolio) {
      return res.status(404).json({ msg: 'Portfolio not found' });
    }
    res.json(portfolio);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Add coin to user's portfolio
const addPortfolioItem = async (req, res) => {
  const { symbol, amount } = req.body;

  try {
    let portfolio = await Portfolio.findOne({ user: req.user.id });

    if (!portfolio) {
      portfolio = new Portfolio({
        user: req.user.id,
        coins: [{ symbol, amount }],
      });
    } else {
      // Check if the coin already exists in the portfolio
      const coinIndex = portfolio.coins.findIndex(coin => coin.symbol === symbol);

      if (coinIndex >= 0) {
        // Update the amount if the coin exists
        portfolio.coins[coinIndex].amount += amount;
      } else {
        // Add the new coin to the portfolio
        portfolio.coins.push({ symbol, amount });
      }
    }

    await portfolio.save();
    res.json(portfolio);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = {
  getPortfolio,
  addPortfolioItem,
};
