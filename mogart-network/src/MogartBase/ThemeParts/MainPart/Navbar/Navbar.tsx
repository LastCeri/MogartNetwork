import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { faHome, faSearch, faBell, faEnvelope, faCog, faPowerOff, faPeopleGroup, faMugHot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useData } from '../../../../MogartBase/Context/DataContext';
import { Logout } from '../../../Api/Api';
import Notification, { MessageType } from '../../Notification/Notification';



export default function Navbar() {
  const { isLoggedIn, data } = useData();
  const [notification, setNotification] = useState({ show: false, type: MessageType.Info, message: '' });

  const icons = [
    { icon: faHome, alt: 'Home', to: '/', style: { color: "#6684b3" }},
    { icon: faSearch, alt: 'Search', to: '/Search', style: { color: "#545e75" }},
    { icon: faBell, alt: 'Notifications', to: '/Notifications', style: { color: "#545e75" }},
    { icon: faPeopleGroup, alt: 'Groups', to: '/Groups', style: { color: "#545e75" }},
    { icon: faMugHot, alt: 'Activity', to: '/Activity', style: { color: "#545e75" }},
    { icon: faEnvelope, alt: 'Messages', to: '/Messages', style: { color: "#545e75" }},
    { icon: faCog, alt: 'Settings', to: '/Settings', style: { color: "#545e75" }},
  ];

  const showNotification = (type:any, message:any) => {
    setNotification({ show: true, type, message });
    setTimeout(() => setNotification({ show: false, type: notification.type, message: '' }), 3500);
  };

  const handleLogout = async () => {

    if (!isLoggedIn) {
      console.log("User is not logged in");
      return; 
    }

    try {
      const savedUserAuthID = localStorage.getItem('userAuthID');
      const response = await Logout({ userid: savedUserAuthID });
      showNotification(MessageType.Success, "Logout successful.");
      console.log("Logout successful");
    } catch (error) {
      showNotification(MessageType.Error, "Logout error.");
    }
  };

  return (
    <div className="fixed inset-y-0 w-16 bg-white flex flex-col items-center py-4 shadow-lg z-10">
      {icons.map((item, index) => (
        <Link to={item.to} key={index} className={`mb-4 ${index === 0 ? 'mb-2' : ''} hover:bg-gray-200 p-2 rounded-full transition duration-300`}>
          <FontAwesomeIcon icon={item.icon} className="h-6 w-6" style={item.style} />
        </Link>
      ))}
    {notification.show && <Notification type={notification.type} message={notification.message} />}
      
      <button onClick={handleLogout} className="mt-auto hover:bg-gray-200 p-2 rounded-full transition duration-300">
      <FontAwesomeIcon icon={faPowerOff} className="h-6 w-6" style={{ color: "#0747b0" }} />
      </button>
          
    </div>
  );
}
