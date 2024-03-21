import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../MogartBase/Api/Api';
import { useData } from '../../MogartBase/Context/DataContext';

function LostPasswordPage() {
  const navigate = useNavigate();
  const { setSiteData } = useData();
  const formRef = useRef(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const handleRecoverPassword = async (event:any) => {
    event.preventDefault();
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const email = formData.get('email') as string;

      if (!email) {
        setErrorMessage("Please enter your email address.");
        return;
      }

      try {
        const response = await axios.post(`${API_URL}/recoverPassword`, { email });
        const { status, message } = response.data;
        
        if (status === "Ok") {
          setEmailSent(true);
          setTimeout(() => navigate('/login'), 5000);
        } else {
          setErrorMessage(message || "An error occurred during the recovery process.");
        }
      } catch (error) {
        console.error(error);
        setErrorMessage('An error occurred during the recovery process.');
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-200">
      <div className="flex flex-1 items-center justify-center p-10">
        <div className="w-full max-w-md">
          <form ref={formRef} className="bg-white shadow-lg rounded px-12 pt-6 pb-8 mb-4">
            <div className="text-center mb-4">
              <p className="text-gray-700 text-2xl">Lost Password</p>
              <span className="text-sm text-gray-400">Enter your email to recover your password.</span>
            </div>

            <div className="mb-4">
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="email" id="email" type="email" placeholder="Email" required />
            </div>

            <div className="mb-6">
              <button onClick={handleRecoverPassword} className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                Recover Password
              </button>
            </div>
          </form>
          {emailSent && (
            <div className="text-center text-green-500">
              A recovery email has been sent. Please check your inbox.
            </div>
          )}
          {errorMessage && (
            <div className="text-center text-red-500">
              {errorMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LostPasswordPage;
