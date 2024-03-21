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
            <div className="bg-white shadow-md border border-l-slate-800 ">
              <div className="max-w-7xl mx-auto px-4 sm:px-2 lg:px-12 mt-24">
                <div className="flex justify-between items-center py-6 md:space-x-10">
                      {isLoggedIn ? (
                        <button
                        onClick={() => setActiveTab('all')}
                        className={`bg-slate-400 bg-opacity-10 px-2 py-2 rounded-md text-sm font-medium ${activeTab === 'all' ? 'text-blue-600' : 'text-gray-500'} hover:text-blue-900 transition duration-300 ease-in-out hover:shadow-2xl`}
                        >
                        All Groups
                        </button>
                      ) : (
                        <button
                        onClick={() => setActiveTab('all')}
                        className={`bg-slate-400 bg-opacity-10 px-2 py-2 rounded-md text-sm font-medium ${activeTab === 'all' ? 'text-blue-600' : 'text-gray-500'} hover:text-blue-900 transition duration-300 ease-in-out hover:shadow-2xl`}
                        >
                        Discover Groups
                        </button>
                      )}
                      {isLoggedIn && (
                        <button
                        onClick={() => setActiveTab('my')}
                        className={`bg-slate-400 bg-opacity-10 px-2 py-2 rounded-md text-sm font-medium ${activeTab === 'my' ? 'text-blue-600' : 'text-gray-500'} hover:text-blue-900 transition duration-300 ease-in-out hover:shadow-2xl`}
                        >
                        My Groups
                        </button>
                      )}
                      {isLoggedIn && (
                        <button
                        onClick={() => setActiveTab('create')}
                        className={`bg-slate-400 bg-opacity-10 px-2 py-2 rounded-md text-sm font-medium ${activeTab === 'create' ? 'text-blue-600' : 'text-gray-500'} hover:text-blue-900 transition duration-300 ease-in-out hover:shadow-2xl`}
                        >
                        Create a Group
                        </button>
                      )}
                      <div className="relative w-full max-w-xs">
                        <input
                          type="search"
                          name="search"
                          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
                          placeholder="Search Groups..."
                        />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
                      </svg>
                    </div>
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
