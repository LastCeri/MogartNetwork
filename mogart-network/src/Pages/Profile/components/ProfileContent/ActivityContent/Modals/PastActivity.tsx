import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UserData } from '../../../../Profile';
import { faCalendarAlt, faStar, faUser } from '@fortawesome/free-solid-svg-icons';
import { useData } from '../../../../../../MogartBase/Context/DataContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../../../../../MogartBase/Api/Api';

interface ProfileActivityContentProps {
    userData: UserData | null;
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (values: Activity) => void;
}

interface Activity {
  Actid: string;
  ActName: string;
  ActContent: string;
  ActType: string;
  ActStatus: string;
  ActDate: string;
  ActPoints:string;
}

const PastActivity: React.FC<ProfileActivityContentProps> = ({ userData, isOpen, onClose, onSubmit }) => {
  const navigate = useNavigate();
  const [activities, setActivities] = useState<Activity[]>([]);
  const { isLoggedIn,data, isLoading,userAuthToken } = useData();

  const isProfileInvitation = useIsProfileInvitation(data?.UserName);

  function useIsProfileInvitation(userName?: string): boolean {
    return window.location.pathname === '/Profile' || window.location.pathname.includes(userName || '');
  }

  useEffect(() => {
    if (isLoading) return;
  
    if (!isLoggedIn) {
      navigate('/login');
      return; 
    }
  
    if (isLoggedIn && isProfileInvitation) {
      axios.get(`${API_URL}/${data?.UserName}/GetActivity/Past`, {
        headers: {
            'Authorization': `Bearer ${userAuthToken}`
        }
        })
        .then(response => {
          const data = response.data;
          if (Array.isArray(data)) {
            setActivities(data);
          } else {
            console.error('Unexpected structure of data', data);
            setActivities([]);
          }
        })
        .catch(error => {
          if (error.code === "ERR_NETWORK") {
            console.error('Network error:', error);
            navigate('/NetworkError');
          } else if (error.response) {
            console.error('Activity data fetching failed:', error.response.data);
          } else {
            console.error('Error:', error.message);
          }
        });
    }
  }, [isLoggedIn, isProfileInvitation, isLoading, navigate, data?.UserName,userAuthToken]);
  




    return (
        <main className="flex-1 p-6 overflow-auto">
        {activities.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 text-lg">No past activities available.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {activities.map((activity, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden border border-green-300 shadow hover:shadow-lg transition-shadow duration-300 ease-in-out p-4">
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{activity.ActName}</h3>
                    <p className="text-sm text-gray-500 my-2">
                      <FontAwesomeIcon icon={faUser} className="mr-2" />
                      {activity.ActName}
                    </p>
                    <p className="text-sm text-gray-500 my-2">
                      <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                      {activity.ActDate}
                    </p>
                    <p className="text-sm text-gray-500 my-2">
                      <FontAwesomeIcon icon={faStar} className="mr-2" />
                      {activity.ActPoints} Points
                    </p>
                  </div>
                  <div className="bg-gray-100 p-3">
                      <p className="text-xs text-gray-500">{activity.ActContent}</p>
                  </div>
              </div>
            ))}
          </div>
        )}
      </main>
  );
};

export default PastActivity;
