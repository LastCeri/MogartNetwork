import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../../../../../../Api/Api';
import axios from 'axios';


const MostPopularMember = () => {
  const [mostPopularMembers, setMostPopularMembers] = useState<{ Mpid: number; MpAvatar: string; MpUsername: string; MpUserID: string }[]>([]);

  useEffect(() => {
    axios.get(`${API_URL}/GetMPM`) 
      .then((response) => {
        const data = response.data;
        setMostPopularMembers(data);
      })
      .catch((error) => {
        console.error('An error occurred while fetching data: ', error);
      });
  }, []);

  return (
    <div className="mb-6 bg-white p-4 rounded-lg shadow-lg">
      <h5 className="text-lg font-semibold mb-4">Most Popular Members</h5>
      <div className="bg-white p-4 rounded-lg">
      {mostPopularMembers.map((member) => (
        <div key={member.Mpid} className="py-2 hover:bg-gray-300 rounded-md transition duration-200">
          <Link to={`Profile/${member.MpUsername}`} className="flex items-center space-x-3">
            <img className="h-6 w-6 rounded-full" src={member.MpAvatar} alt={member.MpUsername} />
            <span className="text-sm font-medium">{member.MpUsername}</span>
          </Link>
        </div>
      ))}
      </div>
    </div>
  );
};

export default MostPopularMember;
