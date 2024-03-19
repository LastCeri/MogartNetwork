import React from 'react';

interface PastInvitationsModalProps {
  isOpen: boolean; 
  onClose: () => void; 
  invitations: {
    Subject: string;
    SenderName: string;
    Date: string; 
  }[]; 
}

function PastInvitationsModal({ isOpen, onClose, invitations }: PastInvitationsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="overflow-auto" style={{ maxHeight: "80vh" }}> 
      {invitations.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500 text-lg">No invitations available.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
          {invitations.map((invitation, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow hover:shadow-lg transition-shadow duration-300 ease-in-out">
              <div className="p-4">
                <h3 className="text-lg font-semibold">{invitation.Subject}</h3>
                <p className="text-sm text-gray-500">From: {invitation.SenderName}</p>
                <p className="text-sm text-gray-400">Date: {invitation.Date}</p>
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
