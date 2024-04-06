import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { UserData } from '../../../../Profile';
import { faCalendarAlt, faStar, faUser } from '@fortawesome/free-solid-svg-icons';
import { CreateActivity } from '../../../../../../MogartBase/Api/Api';
import { useData } from '../../../../../../MogartBase/Context/DataContext';
interface ProfileActivityContentProps {
    userData: UserData | null;
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (values: InvitationFormValues) => void;
}

interface InvitationFormValues {
    subject: string;
    ActivityDate?: string; 
    ActivityType?: string;
    accessType?: string;
    entryFee?: string;
  }


const CreateActivityModal: React.FC<ProfileActivityContentProps> = ({ userData, isOpen, onClose, onSubmit }) => {
  const { isLoggedIn,data, isLoading,userAuthID} = useData();
    const [subject, setSubject] = useState('');
    const [ActivityDate, setActivityDate] = useState('');
    const [ActivityType, setActivityType] = useState('');
    const [Visibility, setAccessType] = useState('');
    const [entryFee, setEntryFee] = useState('');
    const [ActivityCode, setActivitysCode] = useState('');
    const [responsepopup, setResponsePopup] = useState({ visible: false, message: '' });
    const [copied, setCopied] = useState(false);



    const handleCopy = () => {
      navigator.clipboard.writeText(ActivityCode)
        .then(() => setCopied(true))
        .catch((err) => console.error('Could not copy text: ', err));

      setTimeout(() => setCopied(false), 2000);
    };

    const handleActivitys = async (subject:string, activityDate:string, activityType:string, visibility:string, entryFee:string) => {
      const response = await CreateActivity({ UserID:userAuthID, Subject:subject, ActivityDate:activityDate, ActivityType:activityType, Visibility:visibility, EntryFee:entryFee});
      if (response.Status === "Success") {
        setActivitysCode(response.ActivityCode); 
        setResponsePopup({ visible: true, message: 'Activity Created Successfully!' });
      } else {
        setResponsePopup({ visible: true, message: 'Failed to Create Invitation' });
      }
    };
  


  if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center">
          <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-2xl w-full mx-4 border border-blue-300">
              <div className="mb-8">
                  <h2 className="font-bold text-3xl text-gray-800 mb-4 relative before:absolute before:left-0 before:right-0 before:bottom-0 before:h-0.5 before:bg-gradient-to-r from-blue-500 to-purple-500">
                      Create New Activity
                  </h2>
                  <p className="text-gray-600">Fill in the details below to create a new Activity.</p>
              </div>

              <form onSubmit={(e)=> {
                  e.preventDefault();
                  handleActivitys(subject, ActivityDate, ActivityType, Visibility, entryFee);
                  }}>
                  <div className="mb-6">
                      <label htmlFor="name" className="block text-md font-medium text-gray-700">Activity Name</label>
                      <input type="text" id="name" value={subject} onChange={(e)=> setSubject(e.target.value)}
                      className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"/>
                  </div>
                  <div className="mb-6">
                      <label htmlFor="date" className="block text-md font-medium text-gray-700">Activity Date</label>
                      <input type="date" id="validUntil" value={ActivityDate} onChange={(e)=> setActivityDate(e.target.value)}
                      className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"/>
                  </div>
                  <div className="mb-6">
                      <label htmlFor="activityType" className="block text-md font-medium text-gray-700">Activity Type</label>
                      <select id="activityType" value={ActivityType} onChange={(e)=> setActivityType(e.target.value)}
                          className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                          <option value="">Select Type</option>
                          <option value="Travel">Travel</option>
                          <option value="Concert">Concert</option>
                          <option value="Event">Event</option>
                          <option value="Meeting">Meeting</option>
                          <option value="Webinar">Webinar</option>
                          <option value="Other">Other</option>
                      </select>
                  </div>
                  <div className="mb-6">
                      <label htmlFor="visibility" className="block text-md font-medium text-gray-700">Visibility</label>
                      <select id="visibility" value={Visibility} onChange={(e)=> setAccessType(e.target.value)}
                          className="mt-2 p-3 w-full border border-gray-300 rounded-lg shadow-sm">
                          <option value="">Select Access Type</option>
                          <option value="Public">Public</option>
                          <option value="Limited">Limited</option>
                          <option value="Private">Private</option>
                      </select>
                  </div>

                  <div className="mb-6">
                      <label htmlFor="date" className="block text-md font-medium text-gray-700">Activity Fee</label>
                      <input type="text" id="name" value={entryFee} onChange={(e)=> setEntryFee(e.target.value)}
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

              {responsepopup.visible && (
              <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-60">
                  <div className="bg-white rounded-lg shadow-2xl border border-gray-300 transform transition-all duration-300 ease-out scale-95 hover:scale-105 max-w-3xl w-full overflow-hidden">
                      <div className="px-8 py-6 space-y-4">
                          <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                              <div className="flex items-center space-x-4">
                                  <p className="text-xl text-gray-800 font-bold bg-blue-50 px-3 py-1 rounded-md">{ActivityCode}</p>
                                  <button onClick={handleCopy} className="text-gray-500 hover:text-blue-500 transition-colors duration-200 ease-in-out">
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-1" />
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 3h4a2 2 0 012 2v4a2 2 0 01-2 2h-4a2 2 0 01-2-2V5a2 2 0 012-2z" />
                                      </svg>
                                      {copied ? 'Copied' : ''}
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
export default CreateActivityModal;
