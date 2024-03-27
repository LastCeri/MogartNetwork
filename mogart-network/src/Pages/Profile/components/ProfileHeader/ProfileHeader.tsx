import React, { useState, useEffect } from 'react';
import ProfileNavigation from '../ProfileNavigation/ProfileNavigation';
import { Friend, UserData } from '../../Profile';
import { useData } from '../../../../MogartBase/Context/DataContext';
import { PostSendFollowRequest, PostSendFriendRequest } from '../../../../MogartBase/Api/Api';


interface ProfileHeaderProps {
  userData: UserData | null;
  onSelect: (selectedContent: string) => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ userData , onSelect}) => {
  const { data } = useData();
  const [popup, setPopup] = useState({ visible: false, message: '' });

  const userFriends: Friend[] = typeof userData?.UsrFriends === 'string'
    ? JSON.parse(userData?.UsrFriends || '[]')
    : userData?.UsrFriends || [];
  
  const isProfilePage = window.location.pathname === '/Profile' || window.location.pathname.includes(data?.UserName);

  if (!userData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
        <p className="text-lg text-purple-600 font-semibold ml-4">Loading...</p>
      </div>
    );
  }
  
  const isFriend = userFriends.some(friend => friend.name === data?.UserName);
  

  const SendFriendRequest = async (UserName: string) => {
    const response = await PostSendFriendRequest({ UserID: data.UserName, UserName: UserName, Type: "Friend" });
    setPopup({ visible: true, message: 'Friend request sent' });
    setTimeout(() => setPopup({ visible: false, message: '' }), 3000);
  };

  const SendFollowRequest = async (UserName: string) => {
    const response = await PostSendFollowRequest({ UserID: data.UserName, UserName: UserName, Type: "Follow" });
    setPopup({ visible: true, message: 'Follow request sent' });
    setTimeout(() => setPopup({ visible: false, message: '' }), 3000);
  };

  
  const handleSendFriendRequestClick = async () => {
    if(userData && data) {
      await SendFriendRequest(userData.UsrName);
    }
  };
  const handleSendFollowRequestClick = async () => {
    if(userData && data) {
      await SendFollowRequest(userData.UsrName);
    }
  };

  return (
    <div className="flex justify-center items-end pt-16">
      <div className="w-full max-w-7xl mx-auto p-4 mt-8 rounded-xl" style={{ 
        backgroundImage: `url(${userData.UsrBackgroundImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div className="flex items-center justify-between mt-12">
          <div className="flex items-center space-x-4">
            <img
              className="h-24 w-24 rounded-full border-4 border-white object-cover"
              src={userData.UsrProfileImage}
              alt={userData.UsrName}
            />
           <div className="text-white">
              <h2 className="text-4xl font-bold break-words max-w-xl">{userData.UsrDisplayName}</h2>
              <p className="text-md">@{userData.UsrName} - Joined {userData.UsrRegisterDate}</p>
              <p className="text-md">{userData.UsrFollowers} Followers · {userData.UsrFollowing} Following · {userData.UsrScore} Points</p>
          </div>
          </div>
          {!isProfilePage && !isFriend && (
            <div className="flex space-x-2">
              <button onClick={handleSendFollowRequestClick} className="text-blue-500 border border-blue-500 px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:text-white">Follow</button>
              <button onClick={handleSendFriendRequestClick} className="text-blue-500 border border-blue-500 px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:text-white">Add Friend</button>
            </div>
          )}
        </div>
        
        {popup.visible && (
            <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-60">
              <div className="bg-white rounded-xl shadow-2xl border border-gray-300 transform transition duration-300 ease-out scale-95 hover:scale-105 max-w-md mx-auto overflow-hidden animate-bounce">
                <div className="px-8 py-6 text-center">
                  <div className="mb-4 p-2 rounded-full bg-green-100 inline-flex items-center justify-center">
                    <svg className="w-16 h-16 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <p className="text-lg text-gray-800 font-medium">{popup.message}</p>
                </div>
              </div>
            </div>
          )}

        <ProfileNavigation onSelect={onSelect} />
      </div>
    </div>
  );
};

export default ProfileHeader;
