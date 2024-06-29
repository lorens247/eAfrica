# eAfrica
eAfrica is a cryptocurrency portfolio tracker that empowers users to monitor their crypto investments with ease. It provides real-time data on cryptocurrency prices, market trends, and portfolio performance through intuitive visualizations.

## Project Structure

```
eAfrica/
├── server/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── portfolioController.js
│   ├── models/
│   │   ├── User.js
│   │   └── Portfolio.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── portfolioRoutes.js
│   ├── services/
│   │   ├── cryptoService.js
│   │   └── jobService.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── jobs/
│   │   └── fetchCryptoData.js
│   ├── utils/
│   │   └── tokenUtils.js
│   └── server.js
├── client/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── services/
│       ├── App.js
│       ├── index.js
│       └── styles/
├── .eslintrc.json
├── .gitignore
└── package.json

```