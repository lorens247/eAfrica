const kue = require('kue');
require('dotenv').config();

const queue = kue.createQueue({
  redis: {
    host: '127.0.0.1',
    port: 6379,
  },
});

const startJobService = () => {
  queue.process('email', (job, done) => {
    // process the job here
    console.log('Processing job', job.data);
    done();
  });

  console.log('Job service started');
};

module.exports = { startJobService, queue };
