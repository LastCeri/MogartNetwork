// ProfileLeftSidebar.tsx
import React from 'react';

const friends = [
  { name: 'Aron', status: 'Active right now', image:'https://cdn.discordapp.com/attachments/1178319248012095509/1184661745093054515/98511ee98a1930b8938e42caf0904d2d.png?ex=658cc939&is=657a5439&hm=c2835ea2d2dfe2fe18519baa84086f7dfccd07c7250b7f98bb8429d5764622fe&' },
  { name: 'John', status: 'Active 1 hour, 31 minutes ago', image:'https://cdn.discordapp.com/attachments/1178319248012095509/1184661912978460702/profile-picture.png?ex=658cc962&is=657a5462&hm=1df12f7df8bd3e89ec0120ac669512e99e2158686fde51057723ecf166697a60&' },
  { name: 'SnowBell', status: 'Active 15 hours, 35 minutes ago', image:'https://cdn.discordapp.com/attachments/1178319248012095509/1184662140309745726/round_profil_picture_before_.png?ex=658cc998&is=657a5498&hm=34ee76a60278833c45f686263396eb4a5a4f10fba196c9e6116a7046662e4972&' },
  { name: 'TinyLove', status: 'Active 1 day, 2 hours ago', image:'https://cdn.discordapp.com/attachments/1178319248012095509/1184662196689567885/1646754728586.png?ex=658cc9a5&is=657a54a5&hm=33d7546514df5126b505ff9081178a2a57df69191833ce878ab435698121aa76&' },
];

const ProfileLeftSidebar = () => {
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
