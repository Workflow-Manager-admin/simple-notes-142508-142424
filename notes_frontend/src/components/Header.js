import React from 'react';
import logo from '../assets/logo.jpeg';

const Header = () => {
  return (
    <header className="header">
      <img src={logo} alt="App Logo" className="header-logo" />
      <h1>Simple Notes</h1>
    </header>
  );
};

export default Header;
