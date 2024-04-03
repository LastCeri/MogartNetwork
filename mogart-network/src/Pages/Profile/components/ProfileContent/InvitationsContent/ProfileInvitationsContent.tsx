import React, { useState } from 'react';
import CreateInvitationModal from './Modals/CreateInvitationModal';
import PendingInvitationsModal from './Modals/PendingInvitationsModal';
import { UserData } from '../../../Profile';
import PastInvitationsModal from './Modals/PastInvitationsModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faEnvelope, faPlus, faCalendarPlus } from '@fortawesome/free-solid-svg-icons';
import CreatedInvitationModal from './Modals/CreatedInvitationModal';
import { useData } from '../../../../../MogartBase/Context/DataContext';


interface ProfileInvitationsContentProps {
  userData: UserData | null;
}

const ProfileInvitationsContent: React.FC<ProfileInvitationsContentProps> = ({ userData }) => {
  const [activeModal, setActiveModal] = useState('');
  const { isLoggedIn, isLoading, data, userAuthToken } = useData();

  const isProfileInvitation = useIsProfileInvitation(data?.UserName);


  function useIsProfileInvitation(userName?: string): boolean {
    return window.location.pathname === '/Profile' || window.location.pathname.includes(userName || '');
  }

  const handleCreateInvitation = (invitation:any) => {
    setActiveModal(''); 
  };


  let contentComponent;
  switch (activeModal) {
    case 'created':
      contentComponent = <CreatedInvitationModal isOpen={true} onClose={() => setActiveModal('')} onSubmit={handleCreateInvitation} />;
      break;
    case 'create':
      contentComponent = <CreateInvitationModal isOpen={true} onClose={() => setActiveModal('')} onSubmit={handleCreateInvitation} />;
      break;
    case 'pending':
      contentComponent = <PendingInvitationsModal isOpen={true} onClose={() => setActiveModal('')} />;
      break;
    case 'past':
      contentComponent = <PastInvitationsModal isOpen={true} onClose={() => setActiveModal('')} />;
      break;
    default:
      contentComponent = <PendingInvitationsModal isOpen={true} onClose={() => setActiveModal('')}/>;;
  }

  return (
    <main className="flex-1 p-6 overflow-auto">
     <div className="flex justify-center items-center space-x-4">
      {isProfileInvitation && (
        <>
          <button onClick={() => setActiveModal('pending')} className="mb-4 px-4 py-2 rounded text-purple-600 border border-purple-500 hover:bg-purple-700 hover:text-white transition ease-in-out duration-150 shadow-md hover:shadow-lg">
            <FontAwesomeIcon icon={faEnvelope} className="mr-2" /> Pending Invitations
          </button>
          <button onClick={() => setActiveModal('past')} className="mb-4 px-4 py-2 rounded text-green-600 border border-green-600 hover:bg-green-700 hover:text-white transition ease-in-out duration-150 shadow-md hover:shadow-lg">
            <FontAwesomeIcon icon={faClock} className="mr-2" /> Past Invitations
          </button>
          <button onClick={() => setActiveModal('create')} className="mb-4 px-4 py-2 rounded text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white transition ease-in-out duration-150 shadow-md hover:shadow-lg">
            <FontAwesomeIcon icon={faPlus} className="mr-2" />  Create Invitation
          </button>
          <button onClick={() => setActiveModal('created')} className="mb-4 px-4 py-2 rounded text-orange-500 border border-orange-500 hover:bg-orange-500 hover:text-white transition ease-in-out duration-150 shadow-md hover:shadow-lg">
            <FontAwesomeIcon icon={faCalendarPlus} className="mr-2" />  Created Invitation
          </button>
        </>
      )}
    </div>
      {contentComponent}
    </main>
  );
};

export default ProfileInvitationsContent;
