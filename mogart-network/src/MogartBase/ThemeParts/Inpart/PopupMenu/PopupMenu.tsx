import React, { useState } from 'react';
import './PopUpMenu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, faGlobe, faComments, faCameraRetro, 
  faFilm, faBook, faCogs, faMapMarker, 
  faEye, faEyeSlash 
} from '@fortawesome/free-solid-svg-icons';

const PopUpMenu: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { icon: faHome, text: "Menu item 1" },
    { icon: faGlobe, text:  "Menu item 2" },
    { icon: faComments, text: "Menu item 3" },
    { icon: faCameraRetro, text: "Menu item 4" },
    { icon: faFilm, text:  "Menu item 5" },
    { icon: faBook, text: "Menu item 6" },
    { icon: faCogs, text:  "Menu item 7" },
    { icon: faMapMarker, text:  "Menu item 8" },
  ];

  return (
    <>
    <button onClick={toggleMenu} className="popup-menu-toggle-btn">
    <FontAwesomeIcon icon={isMenuOpen ? faEyeSlash : faEye} />
  </button>
    <div className="popup-menu-wrapper">
           <div className={`popup-menu ${isMenuOpen ? 'expand' : 'collapse'}`}>
        <ul className="menu-items">
          {menuItems.map((item, index) => (
            <li key={index}>
              <span className="menu-icon"><FontAwesomeIcon icon={item.icon} className="icon" /></span>
              <span className="menu-text">{item.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </>
  );
}

export default PopUpMenu;
