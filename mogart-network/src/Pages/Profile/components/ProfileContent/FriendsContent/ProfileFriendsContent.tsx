import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { UserData } from '../../../Profile';

interface FriendActivity {
  FriendName: string;
  FriendProfileImage: string;
  Status: string;
}

const dummyUserData = {
  Activity: [
    { FriendName: "Alice", FriendProfileImage: "url-to-Alice's-image", Status: "Active 1 hour, 33 minutes ago" },
    { FriendName: "Danny", FriendProfileImage: "url-to-Danny's-image", Status: "Active 2 hours, 34 minutes ago" },
    { FriendName: "Artis", FriendProfileImage: "url-to-Artis's-image", Status: "Active 3 hours, 35 minutes ago" },
  ],
};

interface ProfileFriendsContentProps {
    userData: UserData | null;
}

const ProfileFriendsContent: React.FC<ProfileFriendsContentProps> = ({ userData }) => {
  const activities = dummyUserData.Activity;

  return (
    <main className="flex-1 p-6 overflow-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {activities.map((activity, index) => (
          <div key={index} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-300 ease-in-out p-4 flex items-center space-x-4">
           
            <FontAwesomeIcon icon={faUserCircle} className="text-gray-400 h-12 w-12" />
            {/* <img src={activity.FriendProfileImage} alt={`${activity.FriendName}'s profile`} className="h-12 w-12 rounded-full" /> */}
            <div>
              <h3 className="text-lg font-medium">{activity.FriendName}</h3>
              <p className="text-sm text-gray-500">{activity.Status}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default ProfileFriendsContent;
