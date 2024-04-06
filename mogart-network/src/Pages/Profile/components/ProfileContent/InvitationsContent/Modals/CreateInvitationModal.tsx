
import React, { useState } from 'react';
import { CreateEventInvation } from '../../../../../../MogartBase/Api/Api';
import { useData } from '../../../../../../MogartBase/Context/DataContext';

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
    const [sendpopup, setSendPopup] = useState({ visible: false, message: '' });
    const [responsepopup, setResponsePopup] = useState({ visible: false, message: '' });
    const { data, userAuthID} = useData();
    const [invitationsCode, setInvitationsCode] = useState('');


  if (!isOpen) return null;

  const handleInvitations = async (subject:string, validUntil:string, invitationType:string, accessType:string, entryFee:string) => {
    await CreateEvent(subject, validUntil, invitationType, accessType, entryFee);
    setSendPopup({ visible: true, message: 'CreateEvent' });
    setTimeout(() => setSendPopup({ visible: false, message: '' }), 3000);
  };

{/* The merkle&witness operation will come here along with the Contract along with o1js. */}
  const CreateEvent = async (subject:string, validUntil:string, invitationType:string, accessType:string, entryFee:string) => {
    const response = await CreateEventInvation({ UserID:userAuthID, Subject:subject, ValidUntil:validUntil, InvitationType:invitationType, AccessType:accessType, EntryFee:entryFee, WalletAdress: data.WalletAddress, TransactionHash:"" });
    const responseData = JSON.parse(response);
    if (responseData.Status === "Success") {
      setInvitationsCode(responseData.InvitationsCode); 
      setResponsePopup({ visible: true, message: 'Invitation Created Successfully!' });
    } else {
      setResponsePopup({ visible: true, message: 'Failed to Create Invitation' });
    }
  };
{/* ------------------------------------------------------------------------------------ */}

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center">
    <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-2xl w-full mx-4 border border-blue-300">
        <div className="mb-8">
            <h2 className="font-bold text-3xl text-gray-800 mb-4 relative before:absolute before:left-0 before:right-0 before:bottom-0 before:h-0.5 before:bg-gradient-to-r from-blue-500 to-purple-500">
                Create New Invitation
            </h2>
            <p className="text-gray-600">Fill in the details below to create a new invitation.</p>
        </div>

        <form onSubmit={(e)=> {
            e.preventDefault();
            handleInvitations(subject, validUntil, invitationType, accessType, entryFee);
            }}>
            <div className="mb-6">
                <label htmlFor="subject" className="block text-md font-medium text-gray-700">Subject</label>
                <input type="text" id="subject" value={subject} onChange={(e)=> setSubject(e.target.value)}
                className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required />
            </div>
            <div className="mb-6">
                <label htmlFor="validUntil" className="block text-md font-medium text-gray-700">Valid Until</label>
                <input type="date" id="validUntil" value={validUntil} onChange={(e)=> setValidUntil(e.target.value)}
                className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required />
            </div>
            <div className="mb-6">
                <label htmlFor="invitationType" className="block text-md font-medium text-gray-700">Invitation Type</label>
                <select id="invitationType" value={invitationType} onChange={(e)=> setInvitationType(e.target.value)}
                    className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    required>
                    <option value="">Select Type</option>
                    <option value="Groups">Groups</option>
                    <option value="Event">Event</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Webinar">Webinar</option>
                    <option value="Other">Other</option>
                </select>
            </div>
            <div className="mb-6">
                <label htmlFor="accessType" className="block text-md font-medium text-gray-700">Access Type</label>
                <select id="accessType" value={accessType} onChange={(e)=> setAccessType(e.target.value)}
                    className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm"
                    required>
                    <option value="">Select Access Type</option>
                    <option value="Public">Public</option>
                    <option value="Limited">Limited</option>
                    <option value="Private">Private</option>
                </select>
            </div>
            <div className="mb-6">
                <label htmlFor="entryFee" className="block text-md font-medium text-gray-700">Entry Fee (Optional)</label>
                <input type="text" id="entryFee" name="entryFee" value={entryFee} onChange={(e)=> setEntryFee(e.target.value)}
                placeholder="Leave empty if free"
                className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"/>
            </div>
            <div className="flex justify-end gap-4">
                <button type="button" onClick={onClose} className="px-6 py-2.5 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 active:bg-gray-400 transition duration-300 ease-in-out shadow hover:shadow-md">
                    Cancel
                </button>
                <button type="submit" className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50 active:bg-blue-800 transition duration-300 ease-in-out shadow hover:shadow-md">
                    Create
                </button>
            </div>
        </form>

        {sendpopup.visible && (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-60">
            <div className="bg-white rounded-xl shadow-2xl border border-gray-300 transform transition duration-300 ease-out scale-95 hover:scale-105 max-w-md mx-auto overflow-hidden">
                <div className="px-8 py-6">
                    <p className="text-lg text-gray-800 font-medium">{sendpopup.message}</p>
                </div>
            </div>
        </div>
        )}


        {responsepopup.visible && (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-60">
            <div className="bg-white rounded-lg shadow-2xl border border-gray-300 transform transition-all duration-300 ease-out scale-95 hover:scale-105 max-w-3xl w-full overflow-hidden">
                <div className="px-8 py-6 space-y-4">
                    <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                        <div className="flex items-center space-x-4">
                            <p className="text-xl text-gray-800 font-bold bg-blue-50 px-3 py-1 rounded-md">{invitationsCode}</p>
                            <button onClick={()=> navigator.clipboard.writeText(invitationsCode)}
                                className="text-gray-500 hover:text-blue-500 transition-colors duration-200 ease-in-out"
                                >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-1" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 3h4a2 2 0 012 2v4a2 2 0 01-2 2h-4a2 2 0 01-2-2V5a2 2 0 012-2z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <p className="text-lg text-gray-800">{responsepopup.message}</p>
                </div>
                <div className="flex justify-end space-x-3 bg-gray-50 px-8 py-4">
                    <button className="text-gray-800 bg-white hover:bg-gray-100 border border-gray-300 font-medium py-2 px-6 rounded-lg shadow transition-colors duration-200 ease-in-out hover:shadow-md" onClick={()=> onClose()}
                        >
                        Cancel
                    </button>
                    <button className="text-white bg-blue-500 hover:bg-blue-600 font-bold py-2 px-6 rounded-lg shadow transition-colors duration-200 ease-in-out hover:shadow-md" onClick={()=> onClose()}
                        >
                        OK
                    </button>
                </div>
            </div>
        </div>
        )}
    </div>
</div>
  );
};

export default CreateInvitationModal;
