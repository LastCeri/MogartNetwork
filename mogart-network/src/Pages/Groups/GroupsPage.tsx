import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../MogartBase/Context/DataContext';

import Navbar from '../../MogartBase/ThemeParts/MainPart/Navbar/Navbar';
import Header from '../../MogartBase/ThemeParts/MainPart/Header/HeaderPart';

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
  const navigate = useNavigate();
  const { isLoggedIn } = useData();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);


  const groups: Group[] = [
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
      name: 'Book Club',
      description: 'Discussing classic literature and latest bestsellers.',
      memberCount: 73,
      imageUrl: 'path-to-book-club-image.jpg', 
      memberAvatars: ['path-to-avatar4.jpg', 'path-to-avatar5.jpg', 'path-to-avatar6.jpg'],
    },
  ]
  
  return (
    <>
      <Header />
      <Navbar />
      <nav className="bg-white px-4 py-3 rounded border border-gray-200">
      <div className="flex flex-col h-screen">
        <div className="flex space-x-4">
          <div>
            <button className="bg-blue-500 text-white px-3 py-2 rounded-md text-sm font-medium">All Groups</button>
          </div>
          <div>
            <button className="text-gray-700 px-3 py-2 rounded-md text-sm font-medium">My Groups</button>
          </div>
          <div>
            <button className="text-gray-700 px-3 py-2 rounded-md text-sm font-medium">Create a Group</button>
          </div>
        </div>

        <div className="flex flex-col h-screen">
          <input className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md shadow-sm" type="text" placeholder="Search Groups..." />
        </div>
      </div>
    </nav>
      <div className="container mx-auto px-4 mt-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((group) => (
          <GroupItem key={group.id} group={group} />
        ))}
      </div>
    </div>
    </>
  );
};

export default GroupsPage;
