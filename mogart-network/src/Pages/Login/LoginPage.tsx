import React, { useState, useRef } from 'react';
import { useData } from '../../MogartBase/Context/DataContext';
import { login } from '../../MogartBase/Api/Api';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const { userAuthToken, setUserAuthToken } = useData();
  const formRef = useRef<HTMLFormElement>(null);
  const [LoginSuccess, setRegistrationSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const formProps = Object.fromEntries(formData);
  
      if (!formData.has('email') || !formData.has('password')) {
        setErrorMessage("Please fill in all fields.");
        return;
      }
      try {
        const response = await login(formProps);
        const { message, status,token } = response;
  
        if (status === "Ok") {
          setUserAuthToken(token);
          setRegistrationSuccess(true);
          setTimeout(() => navigate('/'), 3000);
        } else if (status === "Bad Request") {
          setErrorMessage(message);
        } else if (status === "Not Found") {
          setErrorMessage(message);
        } else {
          setErrorMessage("An error occurred during login.");
        }
      } catch (error) {
        setErrorMessage('An error occurred during login.');
      }
    }
  };
  
  
  
  return (
    <div className="flex h-screen bg-gray-200">
      <div className="flex flex-1 items-center justify-center p-10">
        <div className="w-full max-w-md">
          <form ref={formRef} className="bg-white shadow-lg rounded px-12 pt-6 pb-8 mb-4">

            <div className="text-center mb-4">
              <p className="text-gray-700 text-2xl">Welcome back</p>
              <span className="text-sm text-gray-400">Welcome back! Please enter your details.</span>
            </div>

            <div className="mb-4">
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="email" id="email" type="text" placeholder="Username" />
            </div>

            <div className="mb-6">
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" name="password" id="password" type="password" placeholder="Password" />
            </div>

            <div className="flex items-center justify-between mb-6">
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox text-indigo-600" />
                <span className="ml-2">Remember me</span>
              </label>
              <a href="#" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                Lost your password?
              </a>
            </div>

            <div className="mb-6">
              <button onClick={handleLogin} className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                Login
              </button>
            </div>

            <div className="text-center">
              <a href="/register" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                Register
              </a>
            </div>
          </form>
        </div>
      </div>

      <div className="flex-1 hidden lg:block" style={{ backgroundImage: 'url("https://cdn.discordapp.com/attachments/1188239804756926474/1190675875843280986/Mogart-Login-Background-1.png")', backgroundSize: 'cover' }}>
        <div className="flex h-full bg-black bg-opacity-50 items-center justify-center">
          <div className="text-center text-white p-10">
            <h2 className="text-4xl font-bold mb-2">Make an awesome experience</h2>
            <p className="mb-4">Discover yourself in a fleet of awesome designers, to make more awesome creations</p>
            <a href="#" className="text-lg text-indigo-300 hover:underline">Join 14+ users</a>
          </div>
        </div>
      </div>

      {errorMessage && (
           <div className="fixed bottom-0 inset-x-0 mb-6 flex justify-center">
           <div className="bg-red-500 text-white font-bold py-2 px-4 rounded-full shadow-lg">
             <p>Login Error! {errorMessage} </p>
           </div>
         </div>  
      )}

      {LoginSuccess && (
        <div className="fixed bottom-0 inset-x-0 mb-6 flex justify-center">
          <div className="bg-green-500 text-white font-bold py-2 px-4 rounded-full shadow-lg">
            <p>Login successful! You are being directed.</p>
          </div>
        </div>
      )}

    </div>
  );
}

export default Login;
