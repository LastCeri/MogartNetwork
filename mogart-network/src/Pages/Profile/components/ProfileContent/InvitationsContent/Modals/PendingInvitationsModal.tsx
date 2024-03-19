import React from 'react';


interface PendingInvitationsModalProps {
  isOpen: boolean; 
  onClose: () => void; 
  invitations: {
    Subject: string;
    SenderName: string;
  }[]; 
}

function PendingInvitationsModal({ isOpen, onClose, invitations }: PendingInvitationsModalProps) {
  if (!isOpen) return null;

  return (
    <div>
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
    </div>
  );
}

export default PendingInvitationsModal;
