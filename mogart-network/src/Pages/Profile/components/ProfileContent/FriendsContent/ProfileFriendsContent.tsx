import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Friend, UserData } from '../../../Profile';
import { Link } from 'react-router-dom';

interface ProfileFriendsContentProps {
    userData: UserData | null;
}

const ProfileFriendsContent: React.FC<ProfileFriendsContentProps> = ({ userData }) => {
  const Friends: Friend[] = typeof userData?.UsrFriends === 'string'
  ? JSON.parse(userData?.UsrFriends || '[]')
  : userData?.UsrFriends || [];

  return (
    <main className="flex-1 p-6 overflow-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Friends.map((Friends, index) => (
           <Link to={`/Profile/${Friends.name}`} key={index} className="block hover:bg-gray-100 rounded-lg transition duration-300 ease-in-out">
            <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out p-6 flex items-center space-x-4 hover:bg-gray-50 cursor-pointer">
              <img src={Friends.image || 'default-profile-image-url'} alt={`${Friends.image}'s profile`} className="h-14 w-14 rounded-full object-cover shadow-sm" /> 
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-800 truncate">{Friends.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{Friends.status}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default ProfileFriendsContent;
