import React, { useState, useEffect } from 'react';

import { UserData } from '../../../Profile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { useData } from '../../../../../MogartBase/Context/DataContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { isValidMyGroups } from '../../../../../MogartBase/Api/Sec-2/Checkers/GroupsChecker';
import { API_URL } from '../../../../../MogartBase/Api/Api';

export interface MyGroupInterface {
  GrpID: number;
  GrpName: string;
  GrpDesc: string;
  GrpTags: string[];
  GrpLogo: string;
  GrpMemberCount: string;
}

interface ProfileGroupsContentProps {
  userData: UserData | null;
}

const ProfileGroupsContent: React.FC<ProfileGroupsContentProps> = ({ userData }) => {

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
            console.error('GroupsContent data fetching failed:', error.response.data);
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


  return (
    <main className="flex-1 p-6 overflow-auto">
      {myGroups.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500 text-lg">No groups available.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {myGroups.map((group, index) => (
            <div key={index} className="bg-white rounded-lg shadow hover:shadow-xl transition-shadow duration-300 ease-in-out overflow-hidden">
              <div className="p-4">
                <h3 className="text-lg font-semibold">{group.GrpName}</h3>
                <p className="text-sm text-gray-500 mb-4">{group.GrpDesc}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="flex items-center text-sm text-gray-600">
                    <FontAwesomeIcon icon={faUsers} className="mr-2" />
                    {group.GrpMemberCount} Members
                  </span>
                </div>
                <button className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                  Join
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default ProfileGroupsContent;
