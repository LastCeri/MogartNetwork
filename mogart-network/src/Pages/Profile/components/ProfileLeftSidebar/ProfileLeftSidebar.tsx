// ProfileLeftSidebar.tsx
import React from 'react';
import { UserData } from '../../Profile';

interface ProfileLeftSidebarProps {
  userData: UserData | null;
}


const friends = [
  { name: 'Aron', status: 'Active right now', image:'' },
  { name: 'John', status: 'Active 1 hour, 31 minutes ago', image:'' },
  { name: 'SnowBell', status: 'Active 15 hours, 35 minutes ago', image:'' },
  { name: 'TinyLove', status: 'Active 1 day, 2 hours ago', image:''},
];

const ProfileLeftSidebar: React.FC<ProfileLeftSidebarProps> = ({ userData }) => {
  return (
    <aside className="w-96 bg-white p-12 rounded-lg shadow space-y-4">
      <h2 className="font-bold text-lg mb-2">DARKRICE'S FRIENDS</h2>
      <div className="mb-4">
        <button className="text-sm font-semibold text-blue-600 mr-2">Newest</button>
        <button className="text-sm font-semibold text-gray-600 mr-2">Active</button>
        <button className="text-sm font-semibold text-gray-600">Popular</button>
      </div>
      <ul>
        {friends.map((friend, index) => (
          <li key={index} className="flex items-center mb-3">
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
        ))}
      </ul>
    </aside>
  );
};

export default ProfileLeftSidebar;
