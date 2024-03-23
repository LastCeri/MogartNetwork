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
    <aside className="w-96 bg-gray-50 p-6 rounded-xl shadow-lg space-y-6">
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="font-bold text-2xl mb-6 text-gray-800">{userData?.UsrDisplayName}'S FRIENDS</h2>
  
      <div className="flex mb-6 space-x-2">
        <button className="text-sm font-semibold text-indigo-600 py-2 px-4 rounded-full bg-indigo-50 transition-colors duration-150 ease-in-out hover:bg-indigo-100 hover:text-indigo-700">Newest</button>
        <button className="text-sm font-semibold text-gray-600 py-2 px-4 rounded-full bg-gray-100 transition-colors duration-150 ease-in-out hover:bg-gray-200">Active</button>
        <button className="text-sm font-semibold text-gray-600 py-2 px-4 rounded-full bg-gray-100 transition-colors duration-150 ease-in-out hover:bg-gray-200">Popular</button>
      </div>
  
      <ul className="space-y-4">
        {userFriends.length === 0 ? (
          <li className="text-sm text-gray-500">This person has no friends.</li>
        ) : (
          userFriends.map((friend, index) => (
            <Link to={`/Profile/${friend.name}`} key={index} className="block hover:bg-gray-100 rounded-lg transition duration-300 ease-in-out">
              <li className="flex items-center space-x-4 p-3">
                <img className="h-12 w-12 rounded-full object-cover shadow" src={friend.image} alt={friend.name} />
                <div>
                  <h3 className="font-semibold text-gray-900">{friend.name}</h3>
                  <p className="text-sm text-gray-500">{friend.status}</p>
                </div>
              </li>
            </Link>
          ))
        )}
      </ul>
    </div>
  </aside>
  );
};

export default ProfileLeftSidebar;
