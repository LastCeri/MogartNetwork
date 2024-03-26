import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../../../MogartBase/Api/Api';
import { useData } from '../../../../MogartBase/Context/DataContext';
import { useNavigate } from 'react-router-dom';
import { isValidMyGroups } from '../../../../MogartBase/Api/Sec-2/Checkers/GroupsChecker';

export interface MyGroupInterface {
  GrpID: number;
  GrpName: string;
  GrpDesc: string;
  GrpTags: string[];
  GrpLogo: string;
}

const GroupItem: React.FC<{ group: MyGroupInterface }> = ({ group }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg transform transition-all hover:scale-105 duration-300">
      <img src={group.GrpLogo} alt={group.GrpName} className="w-full h-32 sm:h-48 object-cover" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{group.GrpName}</div>
        <p className="text-gray-700 text-base">{group.GrpDesc}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-blue-700 mr-2 mb-2">{group.GrpTags?.length ?? 0} tags</span>
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
  const [myGroups, setMyGroups] = useState<MyGroupInterface[]>([]);
  const { isLoggedIn, isLoading, data,siteData,userAuthToken } = useData();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyGroups = async () => {
      try {
        const response = await axios.get<MyGroupInterface[]>(`${API_URL}/GetGroups/${data.UserName}`, {
          headers: {
              'Authorization': `Bearer ${userAuthToken}`
          }
      });  

      if (!response.data || !Array.isArray(response.data) || response.data.some(invite => !isValidMyGroups(invite))) {
        console.error('API response is not an array or contains invalid data');
        return;
      }

        setMyGroups(response.data);
      }catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          if (error.code === "ERR_NETWORK") {
            console.error('Network error:', error);
            navigate('/NetworkError');
          } else if (error.response) {
            console.error('MyGroups data fetching failed:', error.response.data);
          } else {
            console.error('Error:', error.message);
          }
        } else {
          console.error('An unexpected error occurred', error);
        }
      }
    };

    if (isLoggedIn) {
      fetchMyGroups();
    }
  }, [isLoggedIn, data.UserName]);

  if (!isLoggedIn) return <p className="text-center text-black-600 font-semibold ml-4">No group information can be obtained without user login.</p>;
  if (isLoading) return  <div className="flex justify-center items-center h-screen">
  <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
  <p className="text-lg text-purple-600 font-semibold ml-4">Loading...</p>
</div>;

  return (
    <main className="flex p-4 h-fit items-center justify-center">
    <div className="max-w-4xl w-full mx-auto bg-white rounded-lg shadow-lg p-8">
      {myGroups?.length === 0 ? (
        <div className="text-center text-gray-600">
          <p>You haven't joined any groups yet.</p>
          <button
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
          >
            Discover Groups
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {myGroups?.map((group) => (
            <GroupItem key={group.GrpID} group={group} />
          ))}
        </div>
      )}
    </div>
  </main>
  );
};

export default MyGroupsPage;
