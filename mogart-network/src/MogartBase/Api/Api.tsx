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

// Post and user data related functions
export const createPost = (postData:any) => handleRequest('POST', 'CreateMogartPost', postData);
export const fetchActivity = (userId:any) => handleRequest('GET', `GetActivity/${userId}`);
export const getUserData = (sessionToken:any) => handleRequest('GET', 'getUserData', { headers: { 'Authorization': `Bearer ${sessionToken}` } });



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
