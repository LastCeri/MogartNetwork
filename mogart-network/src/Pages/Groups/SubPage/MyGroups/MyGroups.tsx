import React, { useState } from 'react';

interface Group {
  id: number;
  name: string;
  description: string;
  tags: string[];
  logo: string;
}

const GroupItem: React.FC<{ group: Group }> = ({ group }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg transform transition-all hover:scale-105 duration-300">
      <img src={group.logo} alt={group.name} className="w-full h-32 sm:h-48 object-cover" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{group.name}</div>
        <p className="text-gray-700 text-base">{group.description}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-blue-700 mr-2 mb-2">{group.tags.length} members</span>
        <div className="flex space-x-2">
        </div>
      </div>
      <div className="px-6 py-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Join Group
        </button>
      </div>
    </div>
  );
};

const MyGroupsPage = () => {
  const [myGroups, setMyGroups] = useState<Group[]>([
    {
      id: 1,
      name: 'Group 1',
      description: 'Description for Group 1',
      tags: ['tag1', 'tag2'],
      logo: 'https://example.com/logo1.jpg',
    },
    {
      id: 2,
      name: 'Group 2',
      description: 'Description for Group 2',
      tags: ['tag3', 'tag4'],
      logo: 'https://example.com/logo2.jpg',
    },
  ]);

  return (
    <main className="flex p-4 bg-gray-100 h-screen">
      <div className="max-w-4xl w-full mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-700 mb-6">My Groups</h1>

        {myGroups.length === 0 ? (
          <p className="text-gray-600">You haven't created any groups yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {myGroups.map((group) => (
              <GroupItem key={group.id} group={group} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default MyGroupsPage;
