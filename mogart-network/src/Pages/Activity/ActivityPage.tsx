import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../../MogartBase/Context/DataContext';
import Header from '../../MogartBase/ThemeParts/MainPart/Header/HeaderPart';
import Navbar from '../../MogartBase/ThemeParts/MainPart/Navbar/Navbar';
import { API_URL } from '../../MogartBase/Api/Api';
import axios from 'axios';

interface Activity {
  Actid: string;
  ActName: string;
  ActContent: string;
  ActStatus: string;
  ActDate: string;
}

const ActivityItem: React.FC<{ activity: Activity }> = ({ activity }) => (
  <div className="border-b border-gray-200 px-4 py-3">
    <h3 className="text-lg text-gray-800">{activity.ActName}</h3>
    <p className="text-sm text-gray-600">{activity.ActContent}</p>
    <p className="text-xs text-gray-500">{activity.ActDate}</p>
  </div>
);



const ActivityPage = () => {
  const navigate = useNavigate();
  const { isLoggedIn, userAuthID, isLoading } = useData();
  const [activities, setActivities] = useState<Activity[]>([]);
  const { username } = useParams();

  useEffect(() => {
    if (isLoading) {
      return;
    }
  
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      axios.get(`${API_URL}/${username}/GetActivity`)
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
        console.error('Error fetching activities:', error);
        setActivities([]);
      });
    }
  }, [isLoggedIn, navigate, userAuthID, isLoading]);

  return (
    <>
      <Header />
      <Navbar />
      <div className="flex flex-col h-screen pt-16">
        <main className="flex-1 overflow-y-auto bg-gray-100">
          <div className="max-w-4xl mx-auto py-4">
            <h1 className="text-2xl font-bold text-gray-700 mb-4">Activity</h1>
            <div className="bg-white shadow rounded-lg">
            {activities && activities.map((activity) => (
              <ActivityItem key={activity.Actid} activity={activity} />
            ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ActivityPage;