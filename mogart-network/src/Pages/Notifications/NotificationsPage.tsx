import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../../MogartBase/Context/DataContext';

import Header from '../../MogartBase/ThemeParts/MainPart/Header/HeaderPart';
import Navbar from '../../MogartBase/ThemeParts/MainPart/Navbar/Navbar';
import { API_URL } from '../../MogartBase/Api/Api';
import axios from 'axios';

interface Notification {
    NotName: string;
    NotContent: string;
    NotDate: string;
}

const NotificationItem: React.FC<{ notification: Notification }> = ({ notification }) => {
    const { NotName, NotContent, NotDate } = notification;

    return (
        <div className="flex items-start p-4 border-b border-gray-200">
            <div className="flex-shrink-0 mr-3">
                <img src="" alt={NotName} className="w-10 h-10 rounded-full" />
            </div>
            <div className="flex-grow">
                <p className="text-sm">
                    <span className="font-semibold">{NotName}</span> {NotContent}
                </p>
                <p className="text-xs text-gray-400">{NotDate}</p>
            </div>
        </div>
    );
};

const NotificationsPage = () => {
    const navigate = useNavigate();
    const { isLoggedIn, isLoading,data } = useData();
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const { username } = useParams();
    useEffect(() => {
        if (isLoading) {
          return;
        }
      
        if (!isLoggedIn) {
          navigate('/login');
        } else {
          axios.get(`${API_URL}/${username}/GetNotifications`)
            .then(response => {
              if (response.status === 200) {
                console.log("Notdatalog",response.data);
                const notificationData: Notification[] = response.data;
                setNotifications(notificationData);
              } else {
                console.error("Geçersiz yanıt durumu:", response.status);
              }
            })
            .catch(error => {
             
              console.error("Hata oluştu:", error);
            });
        }
      }, [isLoggedIn, navigate, isLoading, username]);
      
    return (
        <>
            <Header />
            <Navbar />
            <div className="flex-grow p-8">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-2xl font-bold mb-4">Notifications</h2>
                    <div className="bg-white shadow rounded-lg">
                    {notifications.length > 0 ? (
                      notifications.map((notification, index) => (
                        <NotificationItem key={index} notification={notification} />
                      ))
                    ) : (
                      <p>No notifications available.</p>
                    )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default NotificationsPage;
