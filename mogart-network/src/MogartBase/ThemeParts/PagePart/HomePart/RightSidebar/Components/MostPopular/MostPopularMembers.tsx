import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MostPopularMember = () => {
  const [mostPopularMembers, setMostPopularMembers] = useState<{ Mpid: number; MpAvatar: string; MpUsername: string }[]>([]);

  useEffect(() => {
    axios.get('https://mogartnetwork.deswu.co/GetMPM') 
      .then((response) => {
        const data = response.data;
        setMostPopularMembers(data);
      })
      .catch((error) => {
        console.error('Verileri getirirken bir hata oluştu: ', error);
      });
  }, []);

  return (
    <div className="mb-6 bg-white p-4 rounded-lg shadow-lg">
      <h5 className="text-lg font-semibold mb-4">Most Popular Members</h5>
      <div className="bg-white p-4 rounded-lg">
        {mostPopularMembers.map((member) => (
          <div key={member.Mpid} className="py-2 hover:bg-gray-300 rounded-md transition duration-200">
            <a href="#" className="flex items-center space-x-3">
              <img className="h-6 w-6 rounded-full" src={member.MpAvatar} alt={member.MpUsername} />
              <span className="text-sm font-medium">{member.MpUsername}</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MostPopularMember;
