import React, { useState } from 'react';
import Header from '../../MogartBase/ThemeParts/MainPart/Header/HeaderPart.tsx';
import Navbar from '../../MogartBase/ThemeParts/MainPart/Navbar/Navbar.tsx';

type Group = {
  id: number;
  name: string;
  description: string;
  memberCount: number;
  imageUrl: string;
  memberAvatars: string[];
};

const GroupItem: React.FC<{ group: Group }> = ({ group }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg transform transition-all hover:scale-105 duration-300">
      <img src={group.imageUrl} alt={`${group.name}`} className="w-full h-32 sm:h-48 object-cover" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{group.name}</div>
        <p className="text-gray-700 text-base">{group.description}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-blue-700 mr-2 mb-2">{group.memberCount} members</span>
        <div className="flex space-x-2">
          {group.memberAvatars.map((avatar, index) => (
            <img key={index} src={avatar} alt="Member avatar" className="h-10 w-10 rounded-full" />
          ))}
        </div>
      </div>
      <div className="px-6 py-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Join Group
        </button>
      </div>
    </div>
  );
};

const GroupsPage = () => {
  const [groups, setGroups] = useState<Group[]>([
    {
      id: 1,
      name: 'Nature Lovers',
      description: 'A group for people who love nature and outdoor activities.',
      memberCount: 150,
      imageUrl: 'path-to-nature-lovers-image.jpg',
      memberAvatars: ['path-to-avatar1.jpg', 'path-to-avatar2.jpg', 'path-to-avatar3.jpg'],
    },
    {
      id: 2,
      name: 'Nature Lovers',
      description: 'A group for people who love nature and outdoor activities.',
      memberCount: 150,
      imageUrl: 'path-to-nature-lovers-image.jpg',
      memberAvatars: ['path-to-avatar1.jpg', 'path-to-avatar2.jpg', 'path-to-avatar3.jpg'],
    },
    {
      id: 3,
      name: 'Nature Lovers',
      description: 'A group for people who love nature and outdoor activities.',
      memberCount: 150,
      imageUrl: 'path-to-nature-lovers-image.jpg',
      memberAvatars: ['path-to-avatar1.jpg', 'path-to-avatar2.jpg', 'path-to-avatar3.jpg'],
    },
    {
      id: 4,
      name: 'Nature Lovers',
      description: 'A group for people who love nature and outdoor activities.',
      memberCount: 150,
      imageUrl: 'path-to-nature-lovers-image.jpg',
      memberAvatars: ['path-to-avatar1.jpg', 'path-to-avatar2.jpg', 'path-to-avatar3.jpg'],
    },
    {
      id: 5,
      name: 'Nature Lovers',
      description: 'A group for people who love nature and outdoor activities.',
      memberCount: 150,
      imageUrl: 'path-to-nature-lovers-image.jpg',
      memberAvatars: ['path-to-avatar1.jpg', 'path-to-avatar2.jpg', 'path-to-avatar3.jpg'],
    }, 
    {
      id: 6,
      name: 'Nature Lovers',
      description: 'A group for people who love nature and outdoor activities.',
      memberCount: 150,
      imageUrl: 'path-to-nature-lovers-image.jpg',
      memberAvatars: ['path-to-avatar1.jpg', 'path-to-avatar2.jpg', 'path-to-avatar3.jpg'],
    },  
    {
      id: 7,
      name: 'Nature Lovers',
      description: 'A group for people who love nature and outdoor activities.',
      memberCount: 150,
      imageUrl: 'path-to-nature-lovers-image.jpg',
      memberAvatars: ['path-to-avatar1.jpg', 'path-to-avatar2.jpg', 'path-to-avatar3.jpg'],
    },
    {
      id: 8,
      name: 'Nature Lovers',
      description: 'A group for people who love nature and outdoor activities.',
      memberCount: 150,
      imageUrl: 'path-to-nature-lovers-image.jpg',
      memberAvatars: ['path-to-avatar1.jpg', 'path-to-avatar2.jpg', 'path-to-avatar3.jpg'],
    },

  ]);

  const [activeTab, setActiveTab] = useState('all');

  const getFilteredGroups = () => {
    switch (activeTab) {
    
      case 'create':
      
        return [];
      default:

        return groups;
    }
  };

  const filteredGroups = getFilteredGroups();

  return (
    <> 
    <Header />
    <Navbar />
    <div className="flex">
      <div className="flex flex-col w-full">
        <div className="flex-grow">
          <div className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
              <div className="flex justify-between items-center py-6 md:space-x-10">
                <button onClick={() => setActiveTab('all')} className={`text-base font-medium ${activeTab === 'all' ? 'text-blue-600' : 'text-gray-500'} hover:text-gray-900`}>All Groups</button>
                <button onClick={() => setActiveTab('my')} className={`text-base font-medium ${activeTab === 'my' ? 'text-blue-600' : 'text-gray-500'} hover:text-gray-900`}>My Groups</button>
                <button onClick={() => setActiveTab('create')} className={`text-base font-medium ${activeTab === 'create' ? 'text-blue-600' : 'text-gray-500'} hover:text-gray-900`}>Create a Group</button>
                <div className="relative">
                  <input type="search" name="search" className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Search Groups..." />
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
              {filteredGroups.map(group => (
                <GroupItem key={group.id} group={group} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default GroupsPage;
