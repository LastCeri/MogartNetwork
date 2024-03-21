// ProfileLeftSidebar.tsx
import React from 'react';
import { UserData, Friend } from '../../Profile';
import { Link } from 'react-router-dom';

interface ProfileLeftSidebarProps {
  userData: UserData | null;
}

const ProfileLeftSidebar: React.FC<ProfileLeftSidebarProps> = ({ userData }) => {
  const userFriends: Friend[] = typeof userData?.UsrFriends === 'string'
    ? JSON.parse(userData?.UsrFriends || '[]')
    : userData?.UsrFriends || [];

  return (
    <aside className="w-96 bg-white shadow-lg p-6 sm:p-12 h-auto rounded-lg space-y-4">
  
  <h2 className="font-bold text-xl mb-4 break-words">{userData?.UsrDisplayName}'S FRIENDS</h2>
  
  <div className="flex mb-4 space-x-2">
    <button className="text-sm font-semibold text-blue-600 py-2 px-4 rounded-lg transition-colors duration-150 ease-in-out hover:bg-blue-50">Newest</button>
    <button className="text-sm font-semibold text-gray-600 py-2 px-4 rounded-lg transition-colors duration-150 ease-in-out hover:bg-gray-50">Active</button>
    <button className="text-sm font-semibold text-gray-600 py-2 px-4 rounded-lg transition-colors duration-150 ease-in-out hover:bg-gray-50">Popular</button>
  </div>

  <ul className="space-y-3">
    {userFriends.length === 0 ? (
      <li className="text-sm text-gray-600">This person has no friends.</li>
    ) : (
      userFriends.map((friend, index) => (
        <Link to={`/Profile/${friend.name}`} key={index} className="block">
          <li className="flex items-center space-x-3 p-2 rounded-lg transition duration-300 ease-in-out hover:bg-gray-50 hover:shadow-lg">
            <img
              className="h-10 w-10 rounded-full object-cover"
              src={friend.image}
              alt={friend.name}
            />
            <div>
              <h3 className="font-semibold text-gray-800">{friend.name}</h3>
              <p className="text-xs text-gray-600">{friend.status}</p>
            </div>
          </li>
        </Link>
      ))
    )}
  </ul>
</aside>

  );
};

export default ProfileLeftSidebar;
