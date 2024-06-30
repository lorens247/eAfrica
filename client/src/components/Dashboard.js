import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [portfolio, setPortfolio] = useState(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'x-auth-token': token,
        },
      };
      try {
        const res = await axios.get('/api/portfolio', config);
        setPortfolio(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPortfolio();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      {portfolio ? (
        <div>
          <h3>{portfolio.user.name}'s Portfolio</h3>
          <ul>
            {portfolio.coins.map((coin) => (
              <li key={coin.symbol}>
                {coin.symbol}: {coin.amount}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
