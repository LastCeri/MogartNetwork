import React, { useEffect, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { faHome, faSearch, faBell, faEnvelope, faCog, faPowerOff, faPeopleGroup, faMugHot, faMessage,faBlog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useData } from '../../../../MogartBase/Context/DataContext';
import { logout } from '../../../Api/Api';
import Notification, { MessageType } from '../../Notification/Notification';

export default function Navbar() {
  const { isLoggedIn,isLoading, data,userAuthID } = useData();
  const [notification, setNotification] = useState({ show: false, type: MessageType.Info, message: '' });
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) {
      return;
    }
  }, [data]);

  const createUserDependentUrl = (basePath:string, userDependentPath:string) => {
    return data?.UserName ? `/${data.UserName}${userDependentPath}` : basePath;
  };

  const icons = [
    { icon: faHome, alt: 'Home', to: '/', style: { color: "#6684b3" }},
    { icon: faSearch, alt: 'Search', to: '/Search', style: { color: "#545e75" }},
    { icon: faBell, alt: 'Notifications', to: createUserDependentUrl('/Notifications', '/Notifications'), style: { color: "#545e75" }},
    { icon: faEnvelope, alt: 'Communication', to: '/Communication', style: { color: "#545e75" }},
    { icon: faMessage, alt: 'Messages', to: '/Messages', style: { color: "#545e75" }},
    { icon: faBlog, alt: 'Blogs', to: '/Blogs', style: { color: "#545e75" }},
    { icon: faPeopleGroup, alt: 'Groups', to: '/Groups', style: { color: "#545e75" }},
    { icon: faMugHot, alt: 'Activity', to: createUserDependentUrl('/Activity', '/Activity'), style: { color: "#545e75" }},
    { icon: faCog, alt: 'Settings', to: '/Settings', style: { color: "#545e75" }},
  ];

  const showNotification = (type:any, message:any) => {
    setNotification({ show: true, type, message });
    setTimeout(() => setNotification({ show: false, type: notification.type, message: '' }), 3500);
  };

  const handleLogout = async () => {
    if (!isLoggedIn) {
      return;
    }
  
    try {
      const response = await logout({ userid: userAuthID, email: data?.Email, walletaddress: data?.WalletAddress });
  
      if (response.success === false) {
        showNotification(MessageType.Error, response.message);
      } else {
        showNotification(MessageType.Success, "Logout successful");
        navigate("/login");
      }
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
