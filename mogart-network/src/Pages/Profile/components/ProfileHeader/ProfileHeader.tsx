import React, { useState, useEffect } from 'react';
import ProfileNavigation from '../ProfileNavigation/ProfileNavigation';
import { UserData } from '../../Profile';


interface ProfileHeaderProps {
  userData: UserData | null;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ userData }) => {
  if (!userData) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="flex justify-center items-end pt-16">
      <div className="w-full max-w-7xl mx-auto p-4 mt-8 rounded-xl" style={{ 
        backgroundImage: `url(${userData.UsrBackgroundImage || 'https://cdn.discordapp.com/attachments/1202263923101802506/1202263980203311154/MogartProfileDefaultImage.webp'})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div className="flex items-center justify-between mt-12">
          <div className="flex items-center space-x-4">
            <img
              className="h-24 w-24 rounded-full border-4 border-white"
              src={userData.UsrProfileImage}
              alt={userData.UsrName}
            />
            <div className="text-white">
              <h2 className="text-4xl font-bold">{userData.UsrDisplayName}</h2>
              <p className="text-md">@{userData.UsrName} - Joined {userData.UsrRegisterDate}</p>
              <p className="text-md">{userData.UsrFollowers} Followers · {userData.UsrFollowing} Following · {userData.UsrScore} Points</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:text-white">Following</button>
            <button className="text-blue-500 border border-blue-500 px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:text-white">Friends</button>
          </div>
        </div>
        <ProfileNavigation />
      </div>
    </div>
  );
};

export default ProfileHeader;
