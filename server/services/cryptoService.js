const axios = require('axios');

const getCryptoPrices = async (symbols) => {
  try {
    const symbolString = symbols.join(',');
    const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${symbolString}&vs_currencies=usd`);
    return response.data;
  } catch (err) {
    console.error('Error fetching crypto prices:', err);
    throw err;
  }
};

module.exports = {
  getCryptoPrices,
};
