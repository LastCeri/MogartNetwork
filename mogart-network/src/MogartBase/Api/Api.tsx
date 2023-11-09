import { useState } from 'react';

export const useCsrfToken = () => {
  const [csrfToken, setCsrfToken] = useState('');

  const fetchCsrfToken = async () => {
    try {
      const response = await fetch('http://localhost:3040/TokenRequest', {
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


export async function Request(ApiRequestMethod, Apidata, csrfToken) {
  try {
    console.log("Sending data to server:", Apidata);
    const headers = {
      'Content-Type': 'application/json',
      'CSRF-Token': csrfToken
    };

    const response = await fetch(`http://localhost:3040/${ApiRequestMethod}`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(Apidata),
      credentials: 'include'
    });

    if (response.ok) {
      const jsonResponse = await response.json();
      console.log('Data successfully received from the server:', jsonResponse);
      return jsonResponse;
    } else {
      const errorResponse = await response.text();
      throw new Error('Failed to receive data: ' + errorResponse);
    }
  } catch (error) {
    console.error('Error in Request function:', error);
    throw error;
  }
}
