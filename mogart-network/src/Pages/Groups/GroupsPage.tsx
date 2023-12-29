import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../MogartBase/Context/DataContext';

import Navbar from '../../MogartBase/ThemeParts/MainPart/Navbar/Navbar';
import Header from '../../MogartBase/ThemeParts/MainPart/Header/HeaderPart';

// Define the type for the group object
type Group = {
  id: number;
  name: string;
  description: string;
  memberCount: number;
};

// Define a separate component for a group item
const GroupItem: React.FC<{ group: Group }> = ({ group }) => {
  return (
    <div className="p-4 bg-gray-50 rounded-md">
      <h2 className="text-xl font-semibold text-gray-800">{group.name}</h2>
      <p className="text-sm text-gray-600">{group.description}</p>
      <div className="flex justify-between items-center mt-2">
        <span className="text-sm text-gray-500">{group.memberCount} members</span>
        <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors">
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

  // Sample data with the defined type
  const groups: Group[] = [
    {
      id: 1,
      name: 'Nature Lovers',
      description: 'A group for people who love nature and outdoor activities.',
      memberCount: 150,
    },
    {
      id: 2,
      name: 'Book Club',
      description: 'Discussing classic literature and latest bestsellers.',
      memberCount: 73,
    },
  ];

  return (
    <>
      <Header />
      <Navbar />
      <div className="flex flex-col min-h-screen pt-[heightOfHeaderAndNavbar] bg-gray-100">
        <main className="flex-1 flex justify-center items-center p-4">
          <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold text-gray-700 mb-4">Groups</h1>
            <div className="space-y-4">
              {groups.map((group) => (
                <GroupItem key={group.id} group={group} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default GroupsPage;
