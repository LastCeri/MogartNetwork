import React, { useEffect, useState } from 'react';
import Header from '../../MogartBase/ThemeParts/MainPart/Header/HeaderPart.tsx';
import Navbar from '../../MogartBase/ThemeParts/MainPart/Navbar/Navbar.tsx';
import { fetchGroups } from '../../MogartBase/Api/Api.tsx';

type Group = {
  GrpID: number;
  GrpName: string;
  GrpDesc: string;
  GrpMembersCount: number;
  GrpImage: string;
};

const GroupItem: React.FC<{ group: Group }> = ({ group }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg transform transition-all hover:scale-105 duration-300">
      <img src={group.GrpImage} alt={`${group.GrpName}`} className="w-full h-32 sm:h-48 object-cover" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{group.GrpName}</div>
        <p className="text-gray-700 text-base">{group.GrpDesc}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-blue-700 mr-2 mb-2">{group.GrpMembersCount} members</span>
        <div className="flex space-x-2">
      
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
  const [activeTab, setActiveTab] = useState('all');

  const [groups, setGroups] = useState<Group[]>([
    {
      GrpID: 1,
      GrpName: 'Nature Lovers',
      GrpDesc: 'A group for people who love nature and outdoor activities.',
      GrpMembersCount: 150,
      GrpImage: 'path-to-nature-lovers-image.jpg',
   
    },
    {
      GrpID: 2,
      GrpName: 'Nature Lovers',
      GrpDesc: 'A group for people who love nature and outdoor activities.',
      GrpMembersCount: 150,
      GrpImage: 'path-to-nature-lovers-image.jpg',
    
    },
    {
      GrpID: 3,
      GrpName: 'Nature Lovers',
      GrpDesc: 'A group for people who love nature and outdoor activities.',
      GrpMembersCount: 150,
      GrpImage: 'path-to-nature-lovers-image.jpg',
     
    },
    {
      GrpID: 4,
      GrpName: 'Nature Lovers',
      GrpDesc: 'A group for people who love nature and outdoor activities.',
      GrpMembersCount: 150,
      GrpImage: 'path-to-nature-lovers-image.jpg',
     
    },
    {
      GrpID: 5,
      GrpName: 'Nature Lovers',
      GrpDesc: 'A group for people who love nature and outdoor activities.',
      GrpMembersCount: 150,
      GrpImage: 'path-to-nature-lovers-image.jpg',
    
    }, 
    {
      GrpID: 6,
      GrpName: 'Nature Lovers',
      GrpDesc: 'A group for people who love nature and outdoor activities.',
      GrpMembersCount: 150,
      GrpImage: 'path-to-nature-lovers-image.jpg',
    
    },  
    {
      GrpID: 7,
      GrpName: 'Nature Lovers',
      GrpDesc: 'A group for people who love nature and outdoor activities.',
      GrpMembersCount: 150,
      GrpImage: 'path-to-nature-lovers-image.jpg',
    
    },
    {
      GrpID: 8,
      GrpName: 'Nature Lovers',
      GrpDesc: 'A group for people who love nature and outdoor activities.',
      GrpMembersCount: 150,
      GrpImage: 'path-to-nature-lovers-image.jpg',
     
    },
  ]);

  useEffect(() => {
    if (activeTab === 'all') {
      fetchGroups()
        .then(fetchedGroups => {
          if (fetchedGroups) {
            setGroups(fetchedGroups);
          }
        })
        .catch(error => console.error('Error fetching groups:', error));
    }
  }, [activeTab]); 

  const getFilteredGroups = () => {
    switch (activeTab) {
      case 'create':
        return [];
      case 'my':
        return [];
      case 'all':
        return groups;
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
                <GroupItem key={group.GrpID} group={group} />
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
