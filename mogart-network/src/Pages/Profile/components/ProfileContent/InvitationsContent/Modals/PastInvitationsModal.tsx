import React, { useState, useEffect } from 'react';
import { API_URL } from '../../../../../../MogartBase/Api/Api';
import { useData } from '../../../../../../MogartBase/Context/DataContext';
import axios from 'axios';

interface Invitation {
  InType: string;
  InTitle?: string;
  InalidDate?: string;
  InVisibility?: string;
  InLimitedUsers?: string;
  InFees?: string;
  InWalletAddress?: string;
}
interface PastInvitationsModalProps {
  isOpen: boolean; 
  onClose: () => void; 
  invitations: {
    Subject: string;
    SenderName: string;
    Date: string; 
  }[]; 
}

function PastInvitationsModal({ isOpen, onClose }:any) {
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const { isLoggedIn, isLoading, data, userAuthToken } = useData();

  const isProfileInvitation = useIsProfileInvitation(data?.UserName);

  function useIsProfileInvitation(userName?: string): boolean {
    return window.location.pathname === '/Profile' || window.location.pathname.includes(userName || '');
  }
  
  useEffect(() => {
    if (!isOpen || isLoading) {
      return;
    }

    const fetchInvitations = async () => {
      try {

        if(isLoggedIn && isProfileInvitation)
        {

        const response = await axios.get<Invitation[]>(`${API_URL}/GetInvitations/${data.UserName}/Past`, {
          headers: {
            'Authorization': `Bearer ${userAuthToken}`,
          },
        });

        if (!response.data || !Array.isArray(response.data)) {
          console.error('API response is not valid');
          return;
        }
        setInvitations(response.data);
      }
      } catch (error) {
        console.error('Failed to fetch event invitations:', error);
      }
    };

    fetchInvitations();
  }, [isOpen, isLoading, API_URL, data.UserName, userAuthToken]);

  if (!isOpen) {
    return null;
  }


  return (
    <div className="overflow-auto" style={{ maxHeight: "80vh" }}> 
      {invitations.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500 text-lg">No invitations available.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
          {invitations.map((invitation, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden border border-green-300 shadow hover:shadow-lg transition-shadow duration-300 ease-in-out">
              <div className="p-4">
                <h3 className="text-lg font-semibold">{invitation.InTitle}</h3>
                <p className="text-sm text-gray-500">From: {invitation.InType}</p>
                <p className="text-sm text-gray-400">Date: {invitation.InalidDate}</p>
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
}

export default PastInvitationsModal;
