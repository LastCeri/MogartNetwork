import { useState, useEffect } from 'react';
import axios from 'axios';

export const API_URL = "https://mogartnetwork.deswu.co" ||  "http://localhost:3040" ;

export const useCsrfToken = () => {
  const [csrfToken, setCsrfToken] = useState('');

  const fetchCsrfToken = async () => {
    try {
      const response = await fetch(`${API_URL}/TokenRequest`, {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setCsrfToken(data.csrfToken);
      } else {
        throw new Error('Failed to fetch CSRF token');
      }
    } catch (error) {
      console.error('Error fetching CSRF token:', error);
    }
  };

  return { csrfToken, fetchCsrfToken };
};

export const PostRequest = async (method:any, endpoint:any, data:any) => {
  try {

    const response = await fetch(`${API_URL}/${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    });

    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse;
    } else {
      const errorResponse = await response.text();
      throw new Error(`Failed to receive data: ${errorResponse}`);
    }
  } catch (error) {
    console.error('Error in request function:', error);
    throw error;
  }
};

export const GetRequest = async (endpoint:any, data:any) => {
  try {
    const response = await fetch(`${API_URL}/${endpoint}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`Failed to receive data: ${response.statusText}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error in GET request function:', error);
    throw error;
  }
};

export const login = async (credentials:any) => {
  try {
   
    const response = await PostRequest('POST', 'LoginUser', credentials);
    return response;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};


export const UserCreatePost = async (postdata:any) => {
  try {
   
    const response = await PostRequest('POST', 'AddMogartPost', postdata);
    return response;
  } catch (error) {
    console.error('AddMogartPost error:', error);
    throw error;
  }
};


export const fetchGroups = async () => {
  try {
    const response = await fetch(`${API_URL}/Groups`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching groups:', error);
    return [];
  }
};

export const fetchActivity = async (userid: string) => {
  try {
    const response = await GetRequest("GetActivity", userid);
    return response;
  } catch (error) {
    console.error('Error fetching activity data:', error);
    throw error;
  }
};

export const register = async (userData: any) => {
  try {
    console.log("userData:", userData); 
    const response = await PostRequest('POST', 'RegisterUser', userData);
    return response;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

interface ApiResponseItem {
  Pstid: string;
  PstAuthor: string;
  PstAuthorAvatar: string;
  PstContent: string;
  PstDate: string;
  PstDisLike: number;
  PstLike: number;
  PstMentions: number;
  PstName: string;
  PstPoints: number;
  PstPostCode: string;
  PstSpace: string;
  PstTitle: string;
  PstUrl: string;
  PstViews: number;
}


export const useFetchMogartPosts = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const apiUrl = `${API_URL}/GetMogartPosts`;
      const response = await axios.get(apiUrl);

      const mappedPosts = response.data.map((post: ApiResponseItem) => ({
        GlobalId: post.Pstid,
        Author: post.PstAuthor,
        Avatar: post.PstAuthorAvatar,
        Content: post.PstContent,
        Date: post.PstDate,
        DisLike: post.PstDisLike,
        Like: post.PstLike,
        Mentions: post.PstMentions,
        Name: post.PstName,
        Points: post.PstPoints,
        PostCode: post.PstPostCode,
        Space: post.PstSpace,
        Title: post.PstTitle,
        Url: post.PstUrl,
        Views: post.PstViews,
      }));

      setPosts(mappedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return posts;
};

export const Logout = async (userData: any) => {
  try {
    const response = await PostRequest('POST', 'LogoutUser', userData);
    return response;
  } catch (error) {
    console.error('LogoutUser error:', error);
    throw error;
  }
};


export const getUserData = async (sessionToken:any) => {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionToken}`,
    };

    const response = await fetch(`${API_URL}/getUserData`, {
      method: 'GET',
      headers,
      credentials: 'include',
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Failed to fetch user data');
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};
