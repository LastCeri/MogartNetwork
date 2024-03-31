import React, { useState, useEffect } from 'react';
import { API_URL } from '../../../../../../Api/Api';
import { useNavigate } from 'react-router-dom';

interface GroupType {
  GrpID: number;
  GrpName: string;
  GrpImage: string;
  GrpMembersCount: string;
}

  export default function Groups() {
    const [groups, setGroups] = useState<GroupType[]>([]);
    const navigate = useNavigate();
    useEffect(() => {
      fetch(`${API_URL}/GetGroups`)
        .then(response => response.json())
        .then(data => setGroups(data))
        .catch(error => {
          if (error.code === "ERR_NETWORK") {
            console.error('Network error:', error);
            navigate('/NetworkError');
          } else if (error.response) {
            console.error('BlogDetailsLatest data fetching failed:', error.response.data);
          } else {
            console.error('Error:', error.message);
          }
        });
    }, []);
  
    return (
      <div className="mb-6 bg-white p-4 rounded-lg shadow-lg">
            <h5 className="text-lg font-semibold mb-4 text-center hover:text-blue-600 transition-colors">GROUPS</h5>
            <div className="flex justify-center text-sm font-medium mb-4 space-x-4">
                <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">Newest</a>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Active</a>
                <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Popular</a>
            </div>
            <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
            {groups.map((group) => (
                <div key={group.GrpID} className="flex flex-col sm:flex-row items-center justify-between py-2 border-b last:border-b-0 hover:bg-gray-100 transition-colors">
                    <a href={"/Groups/" + group.GrpName.replace(/\s/g, "")} className="flex items-center space-x-3 mb-2 sm:mb-0">
                    <img className="h-8 w-8 rounded-full" src={group.GrpImage} alt={group.GrpName} />
                    <div>
                        <span className="text-sm font-medium block">{group.GrpName}</span>
                        <span className="text-xs text-gray-500 block">{group.GrpMembersCount} Members</span>
                    </div>
                    </a>
                </div>
                ))}
            </div>
        </div>
    );
}