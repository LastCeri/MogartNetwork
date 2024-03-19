import React from 'react';
import { UserData } from '../../../Profile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';


const dummyUserData = {
    Groups: [
      { Subject: "Join our team meeting", Name: "Alice" ,Description:"", MembersCount:10},
      { Subject: "Weekly Sync-up", Name: "Bob", Description:"", MembersCount:10},
      { Subject: "Project Kickoff", Name: "Charlie", Description:"", MembersCount:10},
    ],
  };


interface ProfileGroupsContentProps {
  userData: UserData | null;
}

const ProfileGroupsContent: React.FC<ProfileGroupsContentProps> = ({ userData }) => {

  const groups = dummyUserData?.Groups || [];

  return (
    <main className="flex-1 p-6 overflow-auto">
      {groups.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500 text-lg">No groups available.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {groups.map((group, index) => (
            <div key={index} className="bg-white rounded-lg shadow hover:shadow-xl transition-shadow duration-300 ease-in-out overflow-hidden">
              <div className="p-4">
                <h3 className="text-lg font-semibold">{group.Name}</h3>
                <p className="text-sm text-gray-500 mb-4">{group.Description}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="flex items-center text-sm text-gray-600">
                    <FontAwesomeIcon icon={faUsers} className="mr-2" />
                    {group.MembersCount} Members
                  </span>
                </div>
                <button className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                  Join
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default ProfileGroupsContent;
