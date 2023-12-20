import React from 'react';
import Header from '../../MogartBase/ThemeParts/MainPart/Header/HeaderPart';
import Navbar from '../../MogartBase/ThemeParts/MainPart/Navbar/Navbar';

const NotificationItem = () => {
    const username = "JohnDoe";
    const action = "Viewed your post.";
    const time = "1h";
    const userAvatar = "path_to_user_avatar.jpg"; 

    return (
        <div className="flex items-start p-4 border-b border-gray-200">
            <div className="flex-shrink-0 mr-3">
                <img src={userAvatar} alt={username} className="w-10 h-10 rounded-full" />
            </div>
            <div className="flex-grow">
                <p className="text-sm">
                    <span className="font-semibold">{username}</span> {action}
                </p>
                <p className="text-xs text-gray-400">{time}</p>
            </div>
        </div>
    );
};

const NotificationsPage = () => {
    return (
        <>
            <Header />
            <Navbar />
            <div className="flex-grow p-8">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-2xl font-bold mb-4">Notifications</h2>
                    <div className="bg-white shadow rounded-lg">
                        <NotificationItem />
                        <NotificationItem />
                    </div>
                </div>
            </div>
        </>
    );
};

export default NotificationsPage;
