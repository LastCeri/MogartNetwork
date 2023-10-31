import React from 'react';
import './PopUpMenu.css';

const PopUpMenu: React.FC = () => {
  return (
    <div className="pop-up-menu">
      <button className="menu-item">Messages</button>
      <button className="menu-item">Blogs</button>
      <button className="menu-item">Poan</button>
    </div>
  );
}

export default PopUpMenu;
