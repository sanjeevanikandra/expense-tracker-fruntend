import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import './Expense.css';

const Header = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    console.log('Stored Username:', storedUsername); 
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <header className="header">
      {/* Logo with Link */}
      <Link to="/" className="logo">
        <img
          src="https://www.shutterstock.com/image-vector/expenses-stamp-on-white-260nw-1360392197.jpg"
          alt="Expense Logo"
          className="logo-img"
        />
        <h1>ExpenseApp</h1>
      </Link>

      {/* Welcome Message */}
      <div className="username">
        {username ? `Welcome, ${username}` : 'Welcome, Guest'}
      </div>
    </header>
  );
};

export default Header;
