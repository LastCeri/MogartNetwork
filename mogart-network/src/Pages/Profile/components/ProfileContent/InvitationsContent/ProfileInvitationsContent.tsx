import React from 'react';
import { UserData } from '../../../Profile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faShareNodes, faThumbsUp } from '@fortawesome/free-solid-svg-icons';


const dummyUserData = {
    Invitations: [
      { Subject: "Join our team meeting", SenderName: "Alice" },
      { Subject: "Weekly Sync-up", SenderName: "Bob" },
      { Subject: "Project Kickoff", SenderName: "Charlie" },
    ],
  };


interface ProfileInvitationsContentProps {
  userData: UserData | null;
}

const ProfileInvitationsContent: React.FC<ProfileInvitationsContentProps> = ({ userData }) => {
  const invitations = dummyUserData?.Invitations || [];

  return (
    <main className="flex-1 p-6 overflow-auto">
      {invitations.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500 text-lg">No invitations available.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {invitations.map((invitation, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out p-4">
              <div className="mb-2">
                <h3 className="text-lg font-semibold">{invitation.Subject}</h3>
                <p className="text-sm text-gray-500">From: {invitation.SenderName}</p>
              </div>
              <div className="flex justify-between items-center">
                <button className="text-white bg-green-500 hover:bg-green-600 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2">
                  Accept
                </button>
                <button className="text-gray-500 border border-gray-300 hover:bg-gray-100 focus:outline-none rounded-lg text-sm px-5 py-2.5 text-center">
                  Decline
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default ProfileInvitationsContent;
