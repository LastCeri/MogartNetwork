import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../../../MogartBase/Api/Api';
import { useData } from '../../../../MogartBase/Context/DataContext';

interface Group {
  id: number;
  name: string;
  description: string;
  tags: string[];
  logo: string;
}

const GroupItem: React.FC<{ group: Group }> = ({ group }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg transform transition-all hover:scale-105 duration-300">
      <img src={group.logo} alt={group.name} className="w-full h-32 sm:h-48 object-cover" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{group.name}</div>
        <p className="text-gray-700 text-base">{group.description}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-blue-700 mr-2 mb-2">{group.tags.length} tags</span>
      </div>
      <div className="px-6 py-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Join Group
        </button>
      </div>
    </div>
  );
};

const MyGroupsPage = () => {
  const [myGroups, setMyGroups] = useState<Group[]>([]);
  const { isLoggedIn, isLoading, data,siteData } = useData();

  useEffect(() => {
    const fetchMyGroups = async () => {
      try {
        const response = await axios.get(`${API_URL}/GetGroups/${data.UserName}`);
        setMyGroups(response.data); 
      } catch (error) {
        console.error('Error fetching my groups:', error);
      }
    };

    fetchMyGroups();
  }, []); 
  if (!isLoggedIn) return <p className="text-center text-black-600 font-semibold ml-4">No group information can be obtained without user login.</p>;
  if (isLoading) return  <div className="flex justify-center items-center h-screen">
  <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
  <p className="text-lg text-purple-600 font-semibold ml-4">Loading...</p>
</div>;

  return (
    <main className="flex p-4 bg-gray-100 h-screen">
      <div className="max-w-4xl w-full mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-700 mb-6">My Groups</h1>

        {myGroups.length === 0 ? (
          <p className="text-gray-600">You haven't joined any groups yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {myGroups.map((group) => (
              <GroupItem key={group.id} group={group} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default MyGroupsPage;
