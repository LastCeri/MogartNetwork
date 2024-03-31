import { useState, useEffect } from 'react';
import axios from 'axios';

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
const handleRequest = async (method:any, endpoint:any, data = {}) => {
  try {
    const response = await axios({
      method,
      url: `${API_URL}/${endpoint}`,
      data,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error(`Error in ${method} request to ${endpoint}:`, error);
    throw error;
  }
};

// Authentication related functions
export const login = (credentials:any) => handleRequest('POST', 'LoginUser', credentials);
export const register = (userData:any) => handleRequest('POST', 'RegisterUser', userData);
export const logout = (userData:any) => handleRequest('POST', 'LogoutUser', userData);


// Action (Like, Dislike, Comment) functions

export const PostSendLike = (credentials:any) => handleRequest('POST', 'Like', credentials);
export const PostSendDislike = (credentials:any) => handleRequest('POST', 'Dislike', credentials);
export const PostSendComment = (credentials:any) => handleRequest('POST', 'Comment', credentials);

// Send Requests (Follow, Friend, Message)

export const PostSendFollowRequest = (credentials:any) => handleRequest('POST', 'SendRequest', credentials);
export const PostSendFriendRequest = (credentials:any) => handleRequest('POST', 'SendRequest', credentials);
export const PostSendMessageRequest = (credentials:any) => handleRequest('POST', 'SendRequest', credentials);

// Accept Requests (Friend, Message)

export const PostAcceptFriendRequest = (credentials:any) => handleRequest('POST', 'Requests', credentials);
export const PostAcceptMessageRequest = (credentials:any) => handleRequest('POST', 'Requests', credentials);
export const PostAcceptFollowRequest = (credentials:any) => handleRequest('POST', 'Requests', credentials);

// Reject Requests (Friend, Message)

export const PostRejectFriendRequest = (credentials:any) => handleRequest('POST', 'Requests', credentials);
export const PostFollowRequest = (credentials:any) => handleRequest('POST', 'Requests', credentials);
export const PostRejectMessageRequest = (credentials:any) => handleRequest('POST', 'Requests', credentials);

// Create Invations (Event,Groups,Meeting, Webinar, Other )

export const CreateEventInvation = (credentials:any) => handleRequest('POST', 'CreateInvation', credentials);
export const CreateGroupsInvation = (credentials:any) => handleRequest('POST', 'CreateInvation', credentials);
export const CreateMeetingInvation = (credentials:any) => handleRequest('POST', 'CreateInvation', credentials);
export const CreateWebinarInvation = (credentials:any) => handleRequest('POST', 'CreateInvation', credentials);
export const CreateOtherInvation = (credentials:any) => handleRequest('POST', 'CreateInvation', credentials);

// Post and user data related functions
export const createPost = (postData:any) => handleRequest('POST', 'CreateMogartPost', postData);
export const fetchActivity = (userId:any) => handleRequest('GET', `GetActivity/${userId}`);
export const getUserData = (sessionToken:any) => handleRequest('GET', 'getUserData', { headers: { 'Authorization': `Bearer ${sessionToken}` } });


// RTC
export const LoginRTC = (credentials:any) => handleRequest('POST', 'RtcLogin', credentials);
export const LogOutRTC = (credentials:any) => handleRequest('POST', 'RtcLogout', credentials);


export const fetchGroups = async () => {
  axios.get(`${API_URL}/GetGroups`)
  .then(response => {
    console.log('Fetched groups:', response.data);
    return response.data;
  })
  .catch(error => {
    console.error('Error fetching groups:', error);
    return [];
  });
};


// Custom hook for fetching posts with automatic mapping
export const useFetchMogartPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/GetMogartPosts`);
        const mappedPosts = data.map((post:any) => ({
          GlobalId: post.Pstid,
          Author: post.PstAuthor,
          Avatar: post.PstAuthorAvatar,
          Content: post.PstContent,
          VideoUrl: post.PstVideos,
          ImageUrl: post.PstImages,
          CommentCount: post.PstCommentCount,
          LikeCount: post.PstLikeCount,
          Date: post.PstDate,
          DisLike: post.PstDisLike,
          Like: post.PstLike,
          Mentions: post.PstMentions,
          Name: post.PstName,
          Points: post.PstPoints,
          PostCode: post.PstPostCode,
          Space: post.PstSpace,
          Title: post.PstTitle,
          VideoTitle: post.PstTitle,
          VideoDesc: post.PstContent,
          Url: post.PstUrl,
          Views: post.PstViews,
        }));
        setPosts(mappedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return posts;
};
