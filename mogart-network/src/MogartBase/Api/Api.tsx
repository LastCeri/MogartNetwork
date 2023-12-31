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

export async function Request(ApiRequestMethod:string, Apidata:any, csrfToken:string) {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'CSRF-Token': csrfToken
    };

    const response = await fetch(`${API_URL}/${ApiRequestMethod}`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(Apidata),
      credentials: 'include'
    });

    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse;
    } else {
      const errorResponse = await response.text();
      throw new Error(`Failed to receive data: ${errorResponse}`);
    }
  } catch (error) {
    console.error('Error in Request function:', error);
    throw error;
  }
}


export async function login(credentials:any, csrfToken:string) {
  try {
    const response = await Request('login', credentials, csrfToken);
    return response;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}


export async function fetchGroups() {
  try {
    const response = await fetch(API_URL+'/Groups'); 
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching groups:', error);
    return [];
  }
}

export async function register(userData:any, csrfToken:string) {
  try {
    const response = await Request('register', userData, csrfToken);
    return response;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
}


export async function getUserData(sessionToken:string) {
  try {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionToken}`
    };

    const response = await fetch(`${API_URL}/getUserData`, {
      method: 'GET',
      headers: headers,
      credentials: 'include'
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
}


