import React, { useState, useEffect } from 'react';
import { API_URL } from '../../../../../../Api/Api';
import { useNavigate } from 'react-router-dom';

export type TypeGroups = {
  GrpID: number;
  GrpName: string;
  GrpDesc: string;
  GrpMembers: string;
  GrpImage: string;
  GrpPoints: string;
  GrpCreateTime: string;
  GrpLastActivate: string;
};

export default function Groups() {
  const [groups, setGroups] = useState<TypeGroups[]>([]);
  const [filteredGroups, setFilteredGroups] = useState<TypeGroups[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/GetGroups`)
      .then(response => response.json())
      .then(data => {
        setGroups(data);
        setFilteredGroups(data); 
      })
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

  const handleFilter = (filter: string) => {
    setSelectedFilter(filter);
    let sortedGroups = [...groups];
    switch (filter) {
      case 'Newest':
        sortedGroups.sort((a, b) => new Date(b.GrpCreateTime).getTime() - new Date(a.GrpCreateTime).getTime());
        break;
      case 'Active':
        sortedGroups.sort((a, b) => new Date(b.GrpLastActivate).getTime() - new Date(a.GrpLastActivate).getTime());
        break;
      case 'Popular':
        sortedGroups.sort((a, b) => parseInt(b.GrpPoints) - parseInt(a.GrpPoints));
        break;
      default:
        sortedGroups.sort((a, b) => new Date(b.GrpCreateTime).getTime() - new Date(a.GrpCreateTime).getTime());
        break;
    }
    setFilteredGroups(sortedGroups);
  };

  return (
    <div className="mb-6 bg-white p-4 rounded-lg shadow-lg">
      <h5 className="text-lg font-semibold mb-4 text-center hover:text-blue-600 transition-colors">GROUPS</h5>
      <div className="flex justify-center text-sm font-medium mb-4 space-x-4">
        <button onClick={() => handleFilter('Newest')} className={`hover:text-blue-800 transition-colors ${selectedFilter === 'Newest' ? 'text-blue-600' : 'text-gray-600'}`}>Newest</button>
        <button onClick={() => handleFilter('Active')} className={`hover:text-blue-800 transition-colors ${selectedFilter === 'Active' ? 'text-blue-600' : 'text-gray-600'}`}>Active</button>
        <button onClick={() => handleFilter('Popular')} className={`hover:text-blue-800 transition-colors ${selectedFilter === 'Popular' ? 'text-blue-600' : 'text-gray-600'}`}>Popular</button>
      </div>
      <div className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
        {filteredGroups.map((group) => {
          let membersCount = "Unknown";
          try {
            const parsedMembers = JSON.parse(group.GrpMembers);
            if (Array.isArray(parsedMembers)) {
              membersCount = parsedMembers.length.toString();
            } else if (parsedMembers && typeof parsedMembers === 'object' && parsedMembers.count) {
              membersCount = parsedMembers.count.toString();
            }
          } catch (error) {
            console.error("Error parsing GrpMembers", error);
          }

          return (
            <div key={group.GrpID} className="flex flex-col sm:flex-row items-center justify-between py-2 border-b last:border-b-0 hover:bg-gray-100 transition-colors">
              <a href={"/Groups/" + group.GrpName.replace(/\s/g, "")} className="flex items-center space-x-3 mb-2 sm:mb-0">
                <img className="h-8 w-8 rounded-full" src={group.GrpImage} alt={group.GrpName} />
                <div>
                  <span className="text-sm font-medium block">{group.GrpName}</span>
                  <span className="text-xs text-gray-500 block">{membersCount} Members</span>
                  <span className="text-xs text-gray-500 block">{group.GrpPoints} Points</span>
                </div>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}