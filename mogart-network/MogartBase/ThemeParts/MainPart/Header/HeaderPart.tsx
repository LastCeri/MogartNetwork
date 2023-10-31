import React from 'react';
import './Header.css';

const Header: React.FC = () => {
  return (
    <div className="header">
      <span className="social-score">Social Score</span>
      <span className="title">Mogart Network</span>
      <button className="menu-btn">...</button>
    </div>
  );
}

export default Header;
