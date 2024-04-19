import React, { useState, useEffect } from 'react';
import { API_URL, ApiResponseError, PostAcceptEventRequest, PostRejectEventRequest } from '../../../MogartBase/Api/Api';
import axios from 'axios';
import { useData } from '../../../MogartBase/Context/DataContext';
import { isValidEventInvitation } from '../../../MogartBase/Api/Sec-1/Checkers/EventInvitationChecker';
import { RequestsNull } from '../CommunicationPage';


export interface EventInvitation {
  ID: number;
  ReqAuthor: string;
  ReqAuthorImage: string;
  ReqContent: string;
  ReqDate: string;
  ReqResponse: string;
  ReqStatus: string; 
  ReqTitle: string;
  ReqType: string;
}


const EventInvitations = () => {
 const [invitations, setInvitations] = useState<EventInvitation[]>([]);
 const { isLoggedIn, isLoading, data, userAuthToken } = useData();

 useEffect(() => {
  if (isLoading || !isLoggedIn)  return;

  const fetchEventRequests = async () => {
    try {
      setInvitations([]);
      const response = await axios.get<EventInvitation[] | ApiResponseError | RequestsNull>(`${API_URL}/GetRequest/${data.UserName}/Event`, {
        headers: {
            'Authorization': `Bearer ${userAuthToken}`
        }
      });  

    if (Array.isArray(response.data)) {
      response.data.forEach(item => {
        if ('IsNull' in item && item.IsNull) {
          setInvitations([]);
          return;
        } else if ('ErrorMessage' in item && 'ErrorCode' in item) {
          console.error(`Server error: ${item.ErrorMessage} (Code: ${item.ErrorCode})`);
          setInvitations([]);
          return;
        } else if (isValidEventInvitation(item)) {
          setInvitations(prev => {
            const exists = prev.some(invation => invation.ID === item.ID);
            return exists ? prev : [...prev, item];
          });
        }
      });
      } else {
        console.error('API response is not an array or contains invalid data');
        setInvitations([]);
      }
    } catch (error) {
      console.error('Failed to fetch friend requests:', error);
    }
  };

  if (!isLoading || isLoggedIn) fetchEventRequests();
}, [isLoading,isLoggedIn]);

  const handleAccept =  async (invitationId:any) => {
    if (!data?.UserName) return;
    try {
      const acceptresponse = await PostAcceptEventRequest({ UserName: data.UserName, RequestId:invitationId, type:"Event", codex:"0x17" },userAuthToken);
    } catch (error) {
      console.error('Failed to accept AcceptEventRequest:', error);
    }
  };

  const handleDecline =  async (invitationId:any) => {
    if (!data?.UserName) return;
    try {
      const rejectresponse = await PostRejectEventRequest({ UserName: data.UserName, RequestId:invitationId, type:"Event", codex:"0x19" },userAuthToken);
    } catch (error) {
      console.error('Failed to reject RejectEventRequest:', error);
    }
  };
  return (
    <div className="p-4 space-y-4 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold text-center">Event Invitation</h2>
      {invitations.length > 0 ? (
        invitations.map(({ ID, ReqAuthor, ReqDate, ReqContent }) => (
          <div key={ID} className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 ease-in-out">
            <div className="px-6 py-4">
              <h3 className="text-2xl font-semibold text-gray-900">{ReqAuthor}</h3>
              <p className="text-sm text-gray-500 mt-1">{ReqDate}</p>
              <p className="mt-3 text-gray-700">{ReqContent}</p>
            </div>
            <div className="flex justify-end space-x-3 p-4 border-t border-gray-200">
              <button onClick={() => handleAccept(ID)} className="px-5 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out">
                Accept
              </button>
              <button onClick={() => handleDecline(ID)} className="px-5 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-150 ease-in-out">
                Decline
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-800">No Event Invitations at the moment.</p>
      )}
    </div>
  );
  
}

export default EventInvitations;
