const kue = require('kue');
const redis = require('redis');
const { getCryptoPrices } = require('../services/cryptoService');
const Portfolio = require('../models/Portfolio');

const queue = kue.createQueue();
const redisClient = redis.createClient();

queue.process('fetchCryptoData', async (job, done) => {
  try {
    const portfolios = await Portfolio.find({});
    const symbols = [...new Set(portfolios.flatMap(portfolio => portfolio.coins.map(coin => coin.symbol)))];

    if (symbols.length === 0) return done();

    const prices = await getCryptoPrices(symbols);

    portfolios.forEach(portfolio => {
      portfolio.coins.forEach(coin => {
        coin.currentPrice = prices[coin.symbol].usd;
      });
      portfolio.save();
    });

    done();
  } catch (err) {
    console.error('Error processing fetchCryptoData job:', err);
    done(err);
  }
});

const scheduleCryptoDataFetch = () => {
  queue.create('fetchCryptoData').save();
  setInterval(() => {
    queue.create('fetchCryptoData').save();
  }, 10 * 60 * 1000); // Schedule job every 10 minutes
};

module.exports = {
  scheduleCryptoDataFetch,
};
