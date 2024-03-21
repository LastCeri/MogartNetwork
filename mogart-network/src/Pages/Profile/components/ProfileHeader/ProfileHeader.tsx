import React, { useState, useEffect } from 'react';
import ProfileNavigation from '../ProfileNavigation/ProfileNavigation';
import { Friend, UserData } from '../../Profile';
import { useData } from '../../../../MogartBase/Context/DataContext';


interface ProfileHeaderProps {
  userData: UserData | null;
  onSelect: (selectedContent: string) => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ userData , onSelect}) => {
  const { data } = useData();
  const userFriends: Friend[] = typeof userData?.UsrFriends === 'string'
    ? JSON.parse(userData?.UsrFriends || '[]')
    : userData?.UsrFriends || [];
    
  if (!userData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
        <p className="text-lg text-purple-600 font-semibold ml-4">Loading...</p>
      </div>
    );
  }
  
  const isFriend = userFriends.some(friend => friend.name === data?.UserName);
  
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
          {!isFriend && (
            <div className="flex space-x-2">
              <button className="text-blue-500 border border-blue-500 px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:text-white">Follow</button>
              <button className="text-blue-500 border border-blue-500 px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:text-white">Add Friend</button>
            </div>
          )}
        </div>
        <ProfileNavigation onSelect={onSelect} />
      </div>
    </div>
  );
};

export default ProfileHeader;
