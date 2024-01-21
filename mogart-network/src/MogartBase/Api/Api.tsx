import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3040';

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

const getRequestHeaders = (csrfToken:any) => ({
  'Content-Type': 'application/json',
  'CSRF-Token': csrfToken,
});

export const request = async (method:any, endpoint:any, data:any) => {
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

export const login = async (credentials:any) => {
  try {
   
    const response = await request('POST', 'LoginUser', credentials);
    return response;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};


export const UserCreatePost = async (postdata:any) => {
  try {
   
    const response = await request('POST', 'AddMogartPost', postdata);
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
    const apiUrl = `http://localhost:3040/GetActivity/${userid}`;
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching activity data:', error);
    throw error;
  }
};

export const register = async (userData: any) => {
  try {
    console.log("userData:", userData); 
    const response = await request('POST', 'RegisterUser', userData);
    return response;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

interface ApiResponseItem {
  Global_Id: string;
  Author: string;
  Content: string;
  Date: string;
  DisLike: string;
  Like: string;
  Mentions: string;
  Name: string;
  Points: string;
  PostCode: string;
  Space: string;
  Title: string;
  Url: string;
  Views: string;
  Avatar: string;
}

export const useFetchMogartPosts = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const apiUrl = 'http://localhost:3040/MogartPosts';
      const response = await axios.get(apiUrl);

      const mappedPosts = response.data.map((post: ApiResponseItem)  => ({
        id: post.Global_Id,
        author: {
          name: post.Author,
          avatar: post.Avatar,
        },
        content: post.Content,
        timestamp: post.Date,
        dislikes: post.DisLike,
        likes: post.Like,
        mentions: post.Mentions,
        name: post.Name,
        points: post.Points,
        postCode: post.PostCode,
        space: post.Space,
        title: post.Title,
        url: post.Url,
        views: post.Views,
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
    console.log("userData:", userData); 
    const response = await request('POST', 'LogoutUser', userData);
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
