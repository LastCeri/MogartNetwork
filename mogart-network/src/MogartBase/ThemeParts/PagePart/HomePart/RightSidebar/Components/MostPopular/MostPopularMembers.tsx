import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../../../../../../Api/Api';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowDown, faArrowUp, faShieldAlt} from '@fortawesome/free-solid-svg-icons';


const MostPopularMember = () => {
  const [mostPopularMembers, setMostPopularMembers] = useState<{ Mpid: number; MpAvatar: string; MpUsername: string; MpUserID: string, MpPoints: string ,MpTrend: string }[]>([]);

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
          <div key={member.Mpid} className="py-2 hover:bg-gray-100 rounded-md transition duration-200 ease-in-out flex justify-between items-center">
            <Link to={`Profile/${member.MpUsername}`} className="flex items-center space-x-3">
              <img className="h-10 w-10 rounded-full object-cover border-2 border-gray-300" src={member.MpAvatar} alt={member.MpUsername} />
              <div>
                <span className="text-sm font-medium text-gray-800">{member.MpUsername}</span>
              </div>
            </Link>
            <div className="flex items-center space-x-1">
            <span className="text-sm font-medium text-gray-600 mx-6 hover:text-gray-800 transition duration-150 ease-in-out transform hover:scale-105 shadow-md">
              {member.MpPoints} Points
            </span>

            {member.MpTrend === 'up' ? (
                <FontAwesomeIcon icon={faArrowUp} className="text-green-500" />
              ) : member.MpTrend === 'down' ? (
                <FontAwesomeIcon icon={faArrowDown} className="text-red-500" />
              ) : (
                <FontAwesomeIcon icon={faShieldAlt} className="text-blue-500" />
              )
            }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default MostPopularMember;
