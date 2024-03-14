import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../MogartBase/ThemeParts/MainPart/Header/HeaderPart.tsx';
import Navbar from '../../MogartBase/ThemeParts/MainPart/Navbar/Navbar.tsx';
import { API_URL } from '../../MogartBase/Api/Api.tsx';
import CreateGroupPage from './SubPage/CreateGroups/CreateGroupsPage.tsx';
import MyGroupsPage from './SubPage/MyGroups/MyGroups.tsx';
import { useData } from '../../MogartBase/Context/DataContext.tsx';

type Group = {
  GrpID: number;
  GrpName: string;
  GrpDesc: string;
  GrpMembersCount: number;
  GrpImage: string;
};

const GroupItem: React.FC<{ group: Group }> = ({ group }) => (
  <div className="bg-white rounded-xl overflow-hidden shadow-lg transform transition-all hover:scale-105 duration-300">
    <a href={"/Groups/" + group.GrpName.replace(/\s/g, "")}>
      <img src={group.GrpImage} alt={group.GrpName} className="w-full h-32 sm:h-48 object-cover" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{group.GrpName}</div>
        <p className="text-gray-700 text-base">{group.GrpDesc}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-blue-700 mr-2 mb-2">{group.GrpMembersCount} members</span>
      </div>
    </a>
    <div className="px-6 py-4">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Join Group
      </button>
    </div>
  </div>
);

const GroupsPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [groups, setGroups] = useState<Group[]>([]);
  const { isLoggedIn, isLoading, data,siteData } = useData();

  useEffect(() => {
    const fetchAndSetGroups = async () => {
      if (activeTab === 'all') {
        try {
          const response = await axios.get<Group[]>(`${API_URL}/GetGroups`);
          setGroups(response.data);
        } catch (error) {
          console.error('Error fetching groups:', error);
        }
      }
    };

    fetchAndSetGroups();
  }, [activeTab]);

  const renderGroupContent = () => {
    switch (activeTab) {
      case 'create':
        return <CreateGroupPage />;
      case 'my':
        return <MyGroupsPage />;
      case 'all':
        return groups.map(group => <GroupItem key={group.GrpID} group={group} />);
      default:
        return null;
    }
  };

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
                {isLoggedIn ? (
                        <button
                          onClick={() => setActiveTab('all')}
                          className={`text-base font-medium ${activeTab === 'all' ? 'text-blue-600' : 'text-gray-500'} hover:text-gray-900`}
                        >
                          All Groups
                        </button>
                      ) : (
                        <button
                          onClick={() => setActiveTab('all')}
                          className={`text-base font-medium ${activeTab === 'all' ? 'text-blue-600' : 'text-gray-500'} hover:text-gray-900`}
                        >
                          Discover Groups
                        </button>
                      )}
                                      {isLoggedIn && (
                        <button
                          onClick={() => setActiveTab('my')}
                          className={`text-base font-medium ${activeTab === 'my' ? 'text-blue-600' : 'text-gray-500'} hover:text-gray-900`}
                        >
                          My Groups
                        </button>
                      )}
                   {isLoggedIn && (
                  <button
                    onClick={() => setActiveTab('create')}
                    className={`text-base font-medium ${activeTab === 'create' ? 'text-blue-600' : 'text-gray-500'} hover:text-gray-900`}
                  >
                    Create a Group
                  </button>
                    )}
                  <div className="relative">
                    <input
                      type="search"
                      name="search"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="Search Groups..."
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className={`grid ${activeTab === 'all' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4' : 'grid-cols-1'} gap-4`}>
                {renderGroupContent()}
            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GroupsPage;
