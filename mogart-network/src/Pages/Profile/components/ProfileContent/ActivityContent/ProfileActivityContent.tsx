import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faUser, faStar, faEnvelope, faClock, faPlus } from '@fortawesome/free-solid-svg-icons';
import { UserData } from '../../../Profile';
import PendingActivity from './Modals/PendingActivity';
import PastActivity from './Modals/PastActivity';
import CreateActivity from './Modals/CreateActivity';

const dummyUserData = {
  Activity: [
    { Activity: "Join our team meeting", Name: "Alice", Date: "2023-03-20", Point: "5" },
    { Activity: "Weekly Sync-up", Name: "Bob", Date: "2023-03-21", Point: "10" },
    { Activity: "Project Kickoff", Name: "Charlie", Date: "2023-03-22", Point: "15" },
  ],
};

interface ProfileActivityContentProps {
    userData: UserData | null;
}

const ProfileActivityContent: React.FC<ProfileActivityContentProps> = ({ userData }) => {
  const [activeModal, setActiveModal] = useState('');
  const invitations = dummyUserData?.Activity || [];

  const handleCreateInvitation = (invitation:any) => {
    console.log(invitation); 
    setActiveModal(''); 
  };

  let contentComponent;
  switch (activeModal) {
    case 'pending':
      contentComponent = <PendingActivity userData={userData} isOpen={true} onClose={() => setActiveModal('')} onSubmit={handleCreateInvitation} />;
      break;
      case 'past':
      contentComponent = <PastActivity userData={userData} isOpen={true} onClose={() => setActiveModal('')} onSubmit={handleCreateInvitation} />;
      break;
      case 'create':
      contentComponent = <CreateActivity userData={userData} isOpen={true} onClose={() => setActiveModal('')} onSubmit={handleCreateInvitation} />;
      break;
    default:
      contentComponent = <PendingActivity userData={userData} isOpen={true} onClose={() => setActiveModal('')} onSubmit={handleCreateInvitation} />;
  }


  return (
    <main className="flex-1 p-6 overflow-auto">
     <div className="flex justify-center items-center space-x-4">
     <button onClick={() => setActiveModal('pending')} className="mb-4 px-4 py-2 rounded text-purple-600 border border-purple-500 hover:bg-purple-700 hover:text-white transition ease-in-out duration-150 shadow-md hover:shadow-lg">
     <FontAwesomeIcon icon={faEnvelope} className="mr-2" /> Pending Activity
      </button>
      <button onClick={() => setActiveModal('past')} className="mb-4 px-4 py-2 rounded text-green-600 border border-green-600 hover:bg-green-700 hover:text-white transition ease-in-out duration-150 shadow-md hover:shadow-lg">
      <FontAwesomeIcon icon={faClock} className="mr-2" /> Past Activity
      </button>
      <button onClick={() => setActiveModal('create')} className="mb-4 px-4 py-2 rounded text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white transition ease-in-out duration-150 shadow-md hover:shadow-lg">
      <FontAwesomeIcon icon={faPlus} className="mr-2" />  Create Activity
      </button>
    </div>
      {contentComponent}
    </main>
  );
};

export default ProfileActivityContent;
