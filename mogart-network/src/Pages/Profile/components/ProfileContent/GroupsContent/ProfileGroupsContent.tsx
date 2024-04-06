import React, { useState,useCallback, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { UserData } from '../../../Profile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { useData } from '../../../../../MogartBase/Context/DataContext';
import axios from 'axios';
import { isValidMyGroups } from '../../../../../MogartBase/Api/Sec-2/Checkers/GroupsChecker';
import { API_URL } from '../../../../../MogartBase/Api/Api';

export interface MyGroupInterface {
  GrpID: string;
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
  const { isLoggedIn, data, userAuthToken } = useData();
  const navigate = useNavigate();
  const location = useLocation();
  const { username } = useParams<{ username?: string }>();


  useEffect(() => {

    setMyGroups([]);
    const fetchMyGroups = async () => {
      let targetUsername = data.UserName;

      if (isLoggedIn && username && location.pathname.includes(username) && username !== data.UserName) {
        targetUsername = username;
      } 
      try {
        const response = await axios.get<MyGroupInterface[]>(`${API_URL}/GetGroups/${targetUsername}`, {
          headers: {
              'Authorization': `Bearer ${userAuthToken}`
          }
        });  

        if (!response.data || !isValidMyGroups(response.data)) {
          console.error('API response is not an array or contains invalid data');
          return;
        }

        setMyGroups(response.data);
      } catch (error: unknown) {
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
  }, [isLoggedIn, data.UserName, username, navigate, userAuthToken,setMyGroups]);

  return (
    <main className="flex-1 p-6 overflow-auto">
     {myGroups.length === 0 ? (
     <div className="flex items-center justify-center h-full">
         <p className="text-gray-500 text-lg">No groups available.</p>
     </div>
     ) : (
     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
         {myGroups.map((group, index) => (
         <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-500">
             <img src={group.GrpLogo} alt="Group logo" className="w-full h-40 object-cover" />
             <div className="p-6">
                 <h3 className="text-xl font-semibold text-gray-800 mb-2">{group.GrpName}</h3>
                 <p className="text-sm text-gray-600 mb-4">{group.GrpDesc}</p>
                 <div className="mb-4">
                     {group.GrpTags.map((tag, tagIndex) => (
                     <span key={tagIndex} className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 mb-2">{tag}</span>
                     ))}
                 </div>
                 <div className="flex items-center justify-between">
                     <span className="flex items-center text-sm text-gray-600">
                         <FontAwesomeIcon icon={faUsers} className="mr-2 text-gray-500" />
                         {group.GrpMemberCount} Members
                     </span>
                     <button className="text-white bg-blue-600 hover:bg-blue-700 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center transition duration-300 ease-in-out">
                         Join
                     </button>
                 </div>
             </div>
         </div>
         ))}
     </div>
     )}
 </main>
  );
};

export default ProfileGroupsContent;
