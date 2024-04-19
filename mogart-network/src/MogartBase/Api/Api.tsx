import { useState, useEffect } from 'react';
import axios from 'axios';


export interface ApiGlobalResponseService {
  EncTarget: string;
  MgrtService:string;
  MgrtCMS: string;
  MgrtCOM: string;
}

export interface ApiResponseError {
  ErrorCode: string;
  ErrorStatus:string;
  ErrorMessage: string;
  Serverislive: string;
}

// Central API URL configuration
export const API_URL = "https://mogartnetwork.deswu.co" ||  "http://localhost:3040" ;

// Custom hook for fetching CSRF token
export const useCsrfToken = () => {
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get(`${API_URL}/TokenRequest`, { withCredentials: true });
        setCsrfToken(response.data.csrfToken);
      } catch (error) {
        console.error('Error fetching CSRF token:', error);
      }
    };

    fetchCsrfToken();
  }, []);

  return csrfToken;
};

// Generic request handler
const handleRequest = async (method:any, endpoint:any, data = {}, authtoken:string) => {
  try {
    const response = await axios({
      method,
      url: `${API_URL}/${endpoint}`,
      data,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authtoken}`
      },
    });

    return response.data;
  } catch (error) {
    console.error(`Error in ${method} request to ${endpoint}:`, error);
    throw error;
  }
};

// Authentication related functions
export const Postlogin = (credentials:any) => handleRequest('POST', 'LoginUser', credentials,"");
export const PostRegister = (credentials:any) => handleRequest('POST', 'RegisterUser', credentials,"");
export const Postlogout = (credentials:any,AuthToken:string) => handleRequest('POST', 'LogoutUser', credentials,AuthToken);

// Verify related functions
export const PostEmailVerify = (credentials:any,AuthToken:string) => handleRequest('POST', 'Verify', credentials, AuthToken);

// Chat functions
export const PostUnclockChatData = (credentials:any, AuthToken:string) => handleRequest('POST', 'ChatUnlock', credentials, AuthToken);
export const PostStartChat = (credentials:any, AuthToken:string) => handleRequest('POST', 'Chats', credentials, AuthToken);

// Action (Like, Dislike, Comment) functions
export const PostSendLike = (credentials:any, AuthToken:string) => handleRequest('POST', 'Like', credentials, AuthToken);
export const PostSendDislike = (credentials:any, AuthToken:string)  => handleRequest('POST', 'Dislike', credentials,AuthToken);
export const PostSendComment = (credentials:any, AuthToken:string)  => handleRequest('POST', 'Comment', credentials,AuthToken);

// Send Requests (Follow, Friend, Message)
export const PostSendFollowRequest = (credentials:any, AuthToken:string)  => handleRequest('POST', 'SendRequest', credentials,AuthToken);
export const PostSendFriendRequest = (credentials:any, AuthToken:string)  => handleRequest('POST', 'SendRequest', credentials,AuthToken);
export const PostSendMessageRequest = (credentials:any, AuthToken:string)  => handleRequest('POST', 'SendRequest', credentials,AuthToken);

// Accept Requests (Friend, Message, Follow, Event)
export const PostAcceptFriendRequest = (credentials:any, AuthToken:string)  => handleRequest('POST', 'Requests', credentials,AuthToken);
export const PostAcceptGroupsRequest = (credentials:any, AuthToken:string)  => handleRequest('POST', 'Requests', credentials,AuthToken);
export const PostAcceptEventRequest = (credentials:any, AuthToken:string)  => handleRequest('POST', 'Requests', credentials,AuthToken);
export const PostAcceptMessageRequest = (credentials:any, AuthToken:string)  => handleRequest('POST', 'Requests', credentials,AuthToken);
export const PostAcceptFollowRequest = (credentials:any, AuthToken:string)  => handleRequest('POST', 'Requests', credentials,AuthToken);

// Reject Requests (Friend, Message)
export const PostRejectFriendRequest = (credentials:any, AuthToken:string)  => handleRequest('POST', 'Requests', credentials,AuthToken);
export const PostRejectGroupsRequest = (credentials:any, AuthToken:string)  => handleRequest('POST', 'Requests', credentials,AuthToken);
export const PostRejectFollowRequest = (credentials:any, AuthToken:string)  => handleRequest('POST', 'Requests', credentials,AuthToken);
export const PostRejectEventRequest = (credentials:any, AuthToken:string)  => handleRequest('POST', 'Requests', credentials,AuthToken);
export const PostRejectMessageRequest = (credentials:any, AuthToken:string) => handleRequest('POST', 'Requests', credentials,AuthToken);

// Create Invations (Event,Groups,Meeting, Webinar, Other )
export const CreateEventInvation = (credentials:any, AuthToken:string)  => handleRequest('POST', 'CreateInvation', credentials,AuthToken);
export const CreateGroupsInvation = (credentials:any, AuthToken:string) => handleRequest('POST', 'CreateInvation', credentials,AuthToken);
export const CreateMeetingInvation = (credentials:any, AuthToken:string)  => handleRequest('POST', 'CreateInvation', credentials,AuthToken);
export const CreateWebinarInvation = (credentials:any, AuthToken:string)  => handleRequest('POST', 'CreateInvation', credentials,AuthToken);
export const CreateOtherInvation = (credentials:any, AuthToken:string)  => handleRequest('POST', 'CreateInvation', credentials,AuthToken);

// Create Activity (Event,Groups,Meeting, Webinar, Other )
export const CreateActivity = (credentials:any, AuthToken:string)  => handleRequest('POST', 'CreateActivity', credentials,AuthToken);

// Post and user data related functions
export const createPost = (postData:any, AuthToken:string)  => handleRequest('POST', 'CreateMogartPost', postData, AuthToken);
export const fetchActivity = (userId:any, AuthToken:string)  => handleRequest('GET', `GetActivity/${userId}`,"",AuthToken);
export const getUserData = (sessionToken:any, AuthToken:string)  => handleRequest('GET', 'getUserData', { headers: { 'Authorization': `Bearer ${sessionToken}` }},AuthToken);

// RTC
export const LoginRTC = (credentials:any, AuthToken:string) => handleRequest('POST', 'RtcLogin', credentials,AuthToken);
export const LogOutRTC = (credentials:any, AuthToken:string) => handleRequest('POST', 'RtcLogout', credentials,AuthToken);



export const fetchGroups = async () => {
  axios.get(`${API_URL}/GetGroups`)
  .then(response => {
    return response.data;
  })
  .catch(error => {
    console.error('Error fetching groups:', error);
    return [];
  });
};
