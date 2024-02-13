import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../../../../../Api/Api';
import { useData } from '../../../../../../Context/DataContext';

interface Activity {
    Actid: string;
    ActName: string;
    ActContent: string;
    ActStatus: string;
    ActDate: string;
    ActAvatar: string;
}

export default function LeftSidebarComponentsLatestActive() {
    const [activities, setActivities] = useState<Activity[]>([]);
    const { data, isLoggedIn } = useData();

    useEffect(() => {
        if (!isLoggedIn || !data || !data.UserName) {
            console.log('User is not logged in or UserName is null, skipping API call.');
            return;
        }

        axios.get(`${API_URL}/${data.UserName}/GetActivity`)
            .then(response => {
                setActivities(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the activities:', error);
            });
    }, [data?.UserName, isLoggedIn]);

    if (!isLoggedIn) {
        return null; 
    }

    return (
        <>
            <div className="mb-10 bg-white rounded-lg shadow p-4">
                <h5 className="text-lg font-semibold mb-2">Latest activities</h5>
                {activities.length > 0 ? (
                    <ul className="space-y-2">
                        {activities.map((activity, index) => (
                            <li key={index} className="hover:bg-gray-100 rounded-md transition duration-200 p-2">
                                <a href="#" className="flex items-center space-x-2">
                                    <img className="h-6 w-6 rounded-full" src={activity.ActAvatar} alt="Avatar" />
                                    <span className="text-sm font-medium">{activity.ActContent}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="text-center py-4">
                        <span className="text-sm text-gray-500">No activities found.</span>
                    </div>
                )}
            </div>
        </>
    );
}
