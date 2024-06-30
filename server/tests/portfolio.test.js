const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const portfolioRoutes = require('../routes/portfolioRoutes');
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/User');
const Portfolio = require('../models/Portfolio');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());
app.use('/api/portfolio', authMiddleware, portfolioRoutes);

let mongoServer;
let token;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const user = new User({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
  });

  await user.save();

  token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET, { expiresIn: '1h' });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe('Portfolio API', () => {
  it('should get user portfolio', async () => {
    const res = await request(app)
      .get('/api/portfolio')
      .set('x-auth-token', token);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('user');
  });

  it('should add a coin to the portfolio', async () => {
    const res = await request(app)
      .post('/api/portfolio')
      .set('x-auth-token', token)
      .send({
        symbol: 'bitcoin',
        amount: 2,
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.coins[0]).toHaveProperty('symbol', 'bitcoin');
  });
});
