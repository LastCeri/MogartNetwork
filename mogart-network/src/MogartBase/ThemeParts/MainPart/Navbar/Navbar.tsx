import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faSearch, faBell, faEnvelope, faCog, faPowerOff, faPeopleGroup, faMugHot } from '@fortawesome/free-solid-svg-icons';
import { Logout } from '../../../Api/Api';

export default function Navbar() {
  const icons = [
    { icon: faHome, alt: 'Home', to: '/', style: { color: "#6684b3" }},
    { icon: faSearch, alt: 'Search', to: '/Search', style: { color: "#545e75" }},
    { icon: faBell, alt: 'Notifications', to: '/Notifications', style: { color: "#545e75" }},
    { icon: faPeopleGroup, alt: 'Groups', to: '/Groups', style: { color: "#545e75" }},
    { icon: faMugHot, alt: 'Activity', to: '/Activity', style: { color: "#545e75" }},
    { icon: faEnvelope, alt: 'Messages', to: '/Messages', style: { color: "#545e75" }},
    { icon: faCog, alt: 'Settings', to: '/Settings', style: { color: "#545e75" }},
  ];

  const handleLogout = async () => {
    try {
      const savedUserAuthID = localStorage.getItem('userAuthID');
      console.log("Logout savedUserAuthID "+savedUserAuthID);
      const response = await Logout({userid:savedUserAuthID}); 

      console.log("Logout response:", response);

    } catch (error) {
      console.error('Logout error:', error);

    }
  };

  return (
    <div className="fixed inset-y-0 w-16 bg-white flex flex-col items-center py-4 shadow-lg z-10">
      {icons.map((item, index) => (
        <Link to={item.to} key={index} className={`mb-4 ${index === 0 ? 'mb-2' : ''} hover:bg-gray-200 p-2 rounded-full transition duration-300`}>
          <FontAwesomeIcon icon={item.icon} className="h-6 w-6" style={item.style} />
        </Link>
      ))}
     
      <button onClick={handleLogout} className="mt-auto hover:bg-gray-200 p-2 rounded-full transition duration-300">
        <FontAwesomeIcon icon={faPowerOff} className="h-6 w-6" style={{ color: "#0747b0" }} />
      </button>
    </div>
  );
}
