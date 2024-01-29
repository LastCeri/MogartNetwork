import React, { useState, useEffect } from 'react';
import ProfileNavigation from '../ProfileNavigation/ProfileNavigation';
import { API_URL } from '../../../../MogartBase/Api/Api';
import axios from 'axios'; 

interface UserData {
  backgroundImageUrl: string;
  profileImageUrl: string;
  username: string;
  handle: string;
  joinDate: string;
  followers: number;
  following: number;
  points: number;
}

const ProfileHeader: React.FC<{ userId: string }> = ({ userId }) => {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get<UserData>(`${API_URL}/GetUserData/${userId}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]); 

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-end pt-16">
      <div className="w-full max-w-7xl mx-auto p-4 mt-8 rounded-xl" style={{ 
        backgroundImage: `url(${userData.backgroundImageUrl})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div className="flex items-center justify-between mt-12">
          <div className="flex items-center space-x-4">
            <img
              className="h-24 w-24 rounded-full border-4 border-white"
              src={userData.profileImageUrl}
              alt={userData.username}
            />
            <div className="text-white">
              <h2 className="text-4xl font-bold">{userData.username}</h2>
              <p className="text-md">@{userData.handle} - Joined {userData.joinDate}</p>
              <p className="text-md">{userData.followers} Followers · {userData.following} Following · {userData.points} Points</p>
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
