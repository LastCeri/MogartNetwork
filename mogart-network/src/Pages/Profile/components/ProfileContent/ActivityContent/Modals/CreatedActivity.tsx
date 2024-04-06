
import React, { useState,useEffect } from 'react';
import { API_URL } from '../../../../../../MogartBase/Api/Api';
import { useData } from '../../../../../../MogartBase/Context/DataContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserData } from '../../../../Profile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faEye, faGlobe, faList } from '@fortawesome/free-solid-svg-icons';

interface CreatedActivityModalProps {
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
    ActVisibility: string;
    ActStatus: string;
    ActDate: string;
    ActPoints:string;
  }

const CreatedActivityModal: React.FC<CreatedActivityModalProps> = ({ userData, isOpen, onClose, onSubmit }) => {
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
        axios.get(`${API_URL}/${data?.UserName}/GetActivity/Created`, {
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
            <p className="text-gray-500 text-lg">No created activities available.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
          {activities.map((activity, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden border border-orange-500 shadow hover:shadow-lg transition-shadow duration-300 ease-in-out">
              <div className="p-4">
                <h3 className="text-lg font-semibold">{activity.ActName}</h3>
                <p className="text-sm text-gray-500"><FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />{activity.ActDate}</p>
                <p className="text-sm text-gray-500"><FontAwesomeIcon icon={faGlobe} className="mr-2" />{activity.ActType}</p>
                <p className="text-sm text-gray-500"><FontAwesomeIcon icon={faEye} className="mr-2" />{activity.ActVisibility}</p>
              </div>
              <div className="bg-gray-100 p-3">
                <p className="text-xs text-gray-500">{activity.ActContent}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      <button onClick={onClose} className="fixed top-0 right-0 m-8 text-gray-600 hover:text-gray-800">
        <span className="text-2xl">&times;</span>
      </button>
    </main>
  );
};

export default CreatedActivityModal;
