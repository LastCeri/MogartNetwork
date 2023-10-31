import React, { useState } from 'react';
import './PopUpMenu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome, faGlobe, faComments, faCameraRetro,
  faFilm, faBook, faCogs, faMapMarker, faInfo,
  faPowerOff,
  faSun
} from '@fortawesome/free-solid-svg-icons';

const PopUpMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  }

  const toggleMode = () => {
    setIsDark(!isDark);
  }

  const menuItems = [
    { href: "#", icon: faHome, text: "Community Dashboard" },
    { href: "#", icon: faGlobe, text: "Global Surveyors", subnav: true },
    { href: "#", icon: faComments, text: "Group Hub Forums", subnav: true },
    { href: "#", icon: faCameraRetro, text: "Survey Photos", subnav: true },
    { href: "#", icon: faFilm, text: "Surveying Tutorials" },
    { href: "#", icon: faBook, text: "Surveying Jobs" },
    { href: "#", icon: faCogs, text: "Tools & Resources" },
    { href: "#", icon: faMapMarker, text: "Member Map" },
    { href: "#", icon: faInfo, text: "Documentation" }
  ];

  return (
    <div className={`app ${isDark ? "dark" : ""}`}>
      <nav className={`popup-menu ${isOpen ? "" : "close"}`}>
        <header>
          <div onClick={toggleSidebar} className="toggle"></div>
        </header>

        <ul className="popup-menu">
          {menuItems.map((item, index) => (
            <li key={index}>
              <a href={item.href}>
                <FontAwesomeIcon icon={item.icon} className="icon" />
                <span className="popup-menu-text">{item.text}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default PopUpMenu;
