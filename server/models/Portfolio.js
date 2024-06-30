const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  coins: [
    {
      symbol: {
        type: String,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      currentPrice: {
        type: Number,
        default: 0,
      },
    },
  ],
});

module.exports = mongoose.model('Portfolio', PortfolioSchema);
