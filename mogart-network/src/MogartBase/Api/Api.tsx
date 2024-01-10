import { useState } from 'react';

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

export const request = async (method:any, endpoint:any, data:any, csrfToken:any) => {
  try {
    const headers = getRequestHeaders(csrfToken);

    const response = await fetch(`${API_URL}/${endpoint}`, {
      method,
      headers,
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

export const login = async (credentials:any, csrfToken:any) => {
  try {
    const response = await request('POST', 'login', credentials, csrfToken);
    return response;
  } catch (error) {
    console.error('Login error:', error);
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

export const register = async (userData:any, csrfToken:any) => {
  try {
    const response = await request('POST', 'register', userData, csrfToken);
    return response;
  } catch (error) {
    console.error('Registration error:', error);
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
