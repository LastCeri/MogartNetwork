import React, { useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faUser, faStar, faEnvelope, faClock, faPlus, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { UserData } from '../../../Profile';
import PendingActivity from './Modals/PendingActivity';
import PastActivity from './Modals/PastActivity';
import CreateActivityModal from './Modals/CreateActivityModal';
import { useParams, useLocation } from 'react-router-dom';
import { useData } from '../../../../../MogartBase/Context/DataContext';
import CreatedActivityModal from './Modals/CreatedActivity';

interface ProfileActivityContentProps {
    userData: UserData | null;
}

type ActiveModalType = 'pending' | 'past' | 'create'| 'created';

const ProfileActivityContent: React.FC<ProfileActivityContentProps> = ({ userData }) => {
  const [activeModal, setActiveModal] = useState<ActiveModalType | ''>('');
  const { isLoggedIn, data } = useData();
  const { username: urlUsername } = useParams<{ username?: string }>();
  const location = useLocation();
  const username = urlUsername || (isLoggedIn ? (data?.UserName || '') : '');


  const isProfileInvitation = useCallback(() => {
    return location.pathname === '/Profile' || location.pathname.includes(data?.UserName || '');
  }, [location, data?.UserName]);

  const handleCreateInvitation = useCallback((invitation:any) => {
    setActiveModal(''); 
  }, []);

  const ModalContent: { [key in ActiveModalType]: JSX.Element } = {
    pending: <PendingActivity userData={userData} isOpen={true} onClose={() => setActiveModal('')} onSubmit={handleCreateInvitation} />,
    past: <PastActivity userData={userData} isOpen={true} onClose={() => setActiveModal('')} onSubmit={handleCreateInvitation} />,
    create: <CreateActivityModal userData={userData} isOpen={true} onClose={() => setActiveModal('')} onSubmit={handleCreateInvitation} />,
    created: <CreatedActivityModal userData={userData} isOpen={true} onClose={() => setActiveModal('')} onSubmit={handleCreateInvitation} />,
  };

  const ModalButtons = [
    { key: 'pending', icon: faEnvelope, label: 'Pending Activity', colorClass: 'text-purple-600 border-purple-500 hover:bg-purple-700' },
    { key: 'past', icon: faClock, label: 'Past Activity', colorClass: 'text-green-600 border-green-600 hover:bg-green-700' },
    { key: 'created', icon: faEnvelope, label: 'Created Activity', colorClass: 'text-orange-500 border border-orange-500 hover:bg-orange-500' },
    { key: 'create', icon: faPlus, label: 'Create Activity', colorClass: 'text-blue-500 border-blue-500 hover:bg-blue-500' },
];

return (
  <main className="flex-1 p-6 overflow-auto">
     <div className="flex justify-center items-center space-x-4">
         {isProfileInvitation() ? (
         ModalButtons.map(({ key, icon, label, colorClass }) => (
         <button key={key} onClick={()=> setActiveModal(key as ActiveModalType)}
             className={`mb-4 px-4 py-2 rounded ${colorClass} hover:text-white transition ease-in-out duration-150 shadow-md hover:shadow-lg`}
             >
             <FontAwesomeIcon icon={icon} className="mr-2" /> {label}
         </button>
         ))
         ) : (

         <div className="text-center py-4">
             <p className="text-gray-700">{username} currently has no activities.</p>
         </div>

         )}
     </div>
     {activeModal && ModalContent[activeModal]}
 </main>
);
};

export default ProfileActivityContent;
