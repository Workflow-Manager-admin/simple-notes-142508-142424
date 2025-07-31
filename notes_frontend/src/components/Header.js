import React from 'react';
import logo from '../assets/logo.jpeg';

const Header = ({ onSearch, searchTerm }) => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="Kavia" className="logo" />
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Filter notes..."
          value={searchTerm}
          onChange={onSearch}
        />
      </div>
    </header>
  );
};

export default Header;
