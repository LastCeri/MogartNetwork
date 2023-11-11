import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import './PopUpMenu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, faGlobe, faComments, faCameraRetro, 
  faFilm, faBook, faCogs, faMapMarker, 
  faEye, faBlog,faEyeSlash 
} from '@fortawesome/free-solid-svg-icons';

const PopUpMenu: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { icon: faHome, text: "Home", url: "/" },
    { icon: faBlog, text:  "Blog", url: "/blog" },
    { icon: faBook, text: "Groups", url: "/groups" },
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
                <Link to={item.url} className="menu-item-link">
                  <span className="menu-icon">
                    <FontAwesomeIcon icon={item.icon} className="icon" />
                  </span>
                  <span className="menu-text">{item.text}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default PopUpMenu;