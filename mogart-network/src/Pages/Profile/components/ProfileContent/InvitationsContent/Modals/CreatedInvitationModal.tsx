
import React, { useState,useEffect } from 'react';
import { API_URL } from '../../../../../../MogartBase/Api/Api';
import { useData } from '../../../../../../MogartBase/Context/DataContext';
import axios from 'axios';

interface CreateInvitationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (values: Invitation) => void;
  }
  interface Invitation {
    InType: string;
    InTitle?: string; 
    InalidDate?: string;
    InVisibility?: string;
    InLimitedUsers?: string;
    InFees?: string;
    InWalletAddress?: string;
  }
  

const CreatedInvitationModal: React.FC<CreateInvitationModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const { isLoggedIn, isLoading, data, userAuthToken } = useData();

  useEffect(() => {
    if (isLoading) {
      return;
    }
    const fetchInvitations = async () => {
      try {
        const response = await axios.get<Invitation[]>(`${API_URL}/GetInvitations/${data.UserName}/All`, {
          headers: {
            'Authorization': `Bearer ${userAuthToken}`,
          },
        });

        if (!response.data || !Array.isArray(response.data)) {
          console.error('API response is not valid');
          return;
        }

        setInvitations(response.data);
      } catch (error) {
        console.error('Failed to fetch event invitations:', error);
      }
    };

    fetchInvitations();
  }, [isLoading, API_URL, data.UserName, userAuthToken]);



  return (
    <div className="overflow-auto" style={{ maxHeight: "80vh" }}> 
      {invitations.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500 text-lg">No invitations available.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
          {invitations.map((invitation, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden border border-orange-500 shadow hover:shadow-lg transition-shadow duration-300 ease-in-out">
              <div className="p-4">
                <h3 className="text-lg font-semibold">{invitation.InTitle}</h3>
                <p className="text-sm text-gray-500">Date: {invitation.InalidDate}</p>
                <p className="text-sm text-gray-400">Type: {invitation.InType}</p>
              </div>
              <div className="bg-gray-100 p-3">
                <p className="text-xs text-gray-500">This is a past invitation. You can review the details or remove it from your list.</p>
              </div>
            </div>
          ))}
        </div>
      )}
      <button onClick={onClose} className="fixed top-0 right-0 m-8 text-gray-600 hover:text-gray-800">
        <span className="text-2xl">&times;</span>
      </button>
    </div>
  );
};

export default CreatedInvitationModal;
