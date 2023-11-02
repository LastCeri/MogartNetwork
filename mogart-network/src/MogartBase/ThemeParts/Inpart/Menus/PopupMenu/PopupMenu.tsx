import React, { useState } from 'react';
import './PopUpMenu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome, faGlobe, faComments, faCameraRetro,
  faFilm, faBook, faCogs, faMapMarker
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
    { href: "#", icon: faGlobe, text: "Global Surveyors" },
    { href: "#", icon: faComments, text: "Group Hub Forums" },
    { href: "#", icon: faCameraRetro, text: "Survey Photos" },
    { href: "#", icon: faFilm, text: "Surveying Tutorials" },
    { href: "#", icon: faBook, text: "Surveying Jobs" },
    { href: "#", icon: faCogs, text: "Tools & Resources" },
    { href: "#", icon: faMapMarker, text: "Member Map" },
  ];

  return (
    <div className={`app ${isDark ? "dark" : ""}`}>
      <nav className={`popup-menu ${isOpen ? "" : "close"}`}>
        {menuItems.map((item, index) => (
          <li key={index}>
            <a href={item.href}>
              <FontAwesomeIcon icon={item.icon} className="icon" />
              <span className="popup-menu-text">{item.text}</span>
            </a>
          </li>
        ))}
      </nav>
    </div>
  );
}

export default PopUpMenu;
