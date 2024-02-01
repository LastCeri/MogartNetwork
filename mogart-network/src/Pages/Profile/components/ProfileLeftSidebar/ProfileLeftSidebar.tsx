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
    <aside className="w-96 bg-white p-12 h-auto rounded-lg shadow space-y-4">
      
      <h2 className="font-bold text-lg mb-2">{userData?.UsrDisplayName}'S FRIENDS</h2>
      
      <div className="mb-4">
        <button className="text-sm font-semibold text-blue-600 mr-2">Newest</button>
        <button className="text-sm font-semibold text-gray-600 mr-2">Active</button>
        <button className="text-sm font-semibold text-gray-600">Popular</button>
      </div>
      <ul>
        {userFriends.length === 0 ? (
          <li className="text-sm text-gray-600">This person has no friends.</li>
        ) : (
          userFriends.map((friend, index) => (
            <Link to={`/Profile/${friend.name}`} key={index} className="block mb-3">
              <li className="flex items-center">
                <img
                  className="h-10 w-10 rounded-full mr-2"
                  src={friend.image}
                  alt={friend.name}
                />
                <div>
                  <h3 className="font-semibold">{friend.name}</h3>
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
