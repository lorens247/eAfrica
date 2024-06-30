import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from '../components/Login';

test('renders login form', () => {
  render(
    <Router>
      <Login />
    </Router>
  );
  const emailLabel = screen.getByText(/Email/i);
  expect(emailLabel).toBeInTheDocument();
});

test('submits the login form', () => {
  render(
    <Router>
      <Login />
    </Router>
  );
  fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john@example.com' } });
  fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } });
  fireEvent.click(screen.getByText(/Login/i));
  expect(localStorage.getItem('token')).toBeTruthy();
});
