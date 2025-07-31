import React from 'react';

const Header = ({ onSearch, searchTerm }) => {
  return (
    <header className="header">
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
