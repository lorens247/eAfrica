const { scheduleCryptoDataFetch } = require('../jobs/fetchCryptoData');

const startJobService = () => {
  scheduleCryptoDataFetch();
};

module.exports = {
  startJobService,
};
