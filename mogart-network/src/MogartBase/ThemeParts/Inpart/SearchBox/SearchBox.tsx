import React from 'react';
import './SearchBox.css';

const SearchBox: React.FC = () => {
  return (
    <div className="search-box">
      <input type="text" placeholder="Search..." />
      <button className="search-btn">🔍</button>
    </div>
  );
}

export default SearchBox;
