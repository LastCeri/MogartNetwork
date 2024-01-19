import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../MogartBase/Context/DataContext';

import Header from '../../MogartBase/ThemeParts/MainPart/Header/HeaderPart';
import Navbar from '../../MogartBase/ThemeParts/MainPart/Navbar/Navbar';

import { fetchActivity } from '../../MogartBase/Api/Api';

interface Activity {
  description: string;
  time: string;
}

const ActivityItem: React.FC<{ activity: Activity }> = ({ activity }) => (
  <div className="border-b border-gray-200 px-4 py-3">
    <p className="text-sm text-gray-600">{activity.description}</p>
    <p className="text-xs text-gray-500">{activity.time}</p>
  </div>
);

const ActivityPage = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useData();
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }else {
      fetchActivityCSRFToken()
        .then((csrfToken) => {
          fetchActivityData(csrfToken);
        })
        .catch((error) => {
          console.error('Error fetching CSRF token:', error);
        });
    }
  }, [isLoggedIn, navigate]);

  const fetchActivityCSRFToken = async () => {
    try {
      const response = await fetchActivity();

      if (response.ok) {
        const data = await response.json();
        return data.csrfToken;
      } else {
        throw new Error('Failed to fetch CSRF token');
      }
    } catch (error) {
      console.error('Error fetching CSRF token:', error);
      throw error;
    }
  };

  const fetchActivityData = async (csrfToken:any) => {
    try {
      const response = await fetchActivity(); 
      setActivities(response.activities);
    } catch (error) {
      console.error('Error fetching activity data:', error);
    }
  };

  return (
    <>
      <Header />
      <Navbar />
      <div className="flex flex-col h-screen pt-16">
        <main className="flex-1 overflow-y-auto bg-gray-100">
          <div className="max-w-4xl mx-auto py-4">
            <h1 className="text-2xl font-bold text-gray-700 mb-4">Activity</h1>
            <div className="bg-white shadow rounded-lg">
              {activities.map((activity, index) => (
                <ActivityItem key={index} activity={activity} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ActivityPage;
