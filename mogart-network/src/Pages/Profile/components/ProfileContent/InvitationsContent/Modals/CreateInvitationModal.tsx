
import React, { useState } from 'react';

interface CreateInvitationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (values: InvitationFormValues) => void;
  }
  interface InvitationFormValues {
    subject: string;
    validUntil?: string; 
    invitationType?: string;
    accessType?: string;
    entryFee?: string;
  }
  

const CreateInvitationModal: React.FC<CreateInvitationModalProps> = ({ isOpen, onClose, onSubmit }) => {
    const [subject, setSubject] = useState('');
    const [validUntil, setValidUntil] = useState('');
    const [invitationType, setInvitationType] = useState('');
    const [accessType, setAccessType] = useState('');
    const [entryFee, setEntryFee] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-2xl w-full mx-4 border border-blue-300">
        <div className="mb-8">
          <h2 className="font-bold text-3xl text-gray-800 mb-4 relative before:absolute before:left-0 before:right-0 before:bottom-0 before:h-0.5 before:bg-gradient-to-r from-blue-500 to-purple-500">
            Create New Invitation
          </h2>
          <p className="text-gray-600">Fill in the details below to create a new invitation.</p>
        </div>

        <form onSubmit={(e) => {
          e.preventDefault();
          onSubmit({ subject, validUntil, invitationType });
        }}>
          <div className="mb-6">
            <label htmlFor="subject" className="block text-md font-medium text-gray-700">Subject</label>
            <input type="text" id="subject" value={subject} onChange={(e) => setSubject(e.target.value)}
                   className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"/>
          </div>
          <div className="mb-6">
            <label htmlFor="validUntil" className="block text-md font-medium text-gray-700">Valid Until</label>
            <input type="date" id="validUntil" value={validUntil} onChange={(e) => setValidUntil(e.target.value)}
                   className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"/>
          </div>
          <div className="mb-6">
            <label htmlFor="invitationType" className="block text-md font-medium text-gray-700">Invitation Type</label>
            <select id="invitationType" value={invitationType} onChange={(e) => setInvitationType(e.target.value)}
                    className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
              <option value="">Select Type</option>
              <option value="Webinar">Friends</option>
              <option value="Webinar">Groups</option>
              <option value="Event">Event</option>
              <option value="Meeting">Meeting</option>
              <option value="Webinar">Webinar</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="mb-6">
            <label htmlFor="accessType" className="block text-md font-medium text-gray-700">Access Type</label>
            <select id="accessType" value={accessType} onChange={(e) => setAccessType(e.target.value)}
                    className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm">
              <option value="">Select Access Type</option>
              <option value="Public">Public</option>
              <option value="Limited">Limited</option>
              <option value="Private">Private</option>
            </select>
          </div>
          <div className="mb-6">
            <label htmlFor="entryFee" className="block text-md font-medium text-gray-700">Entry Fee (Optional)</label>
            <input type="text" id="entryFee" name="entryFee" value={entryFee} onChange={(e) => setEntryFee(e.target.value)}
                  placeholder="Leave empty if free" 
                  className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"/>
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 active:bg-gray-400 transition duration-300 ease-in-out shadow hover:shadow-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50 active:bg-blue-800 transition duration-300 ease-in-out shadow hover:shadow-md"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateInvitationModal;
