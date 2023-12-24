import React, { useState, useRef } from 'react';
import { useData } from '../../MogartBase/Context/DataContext';
import { login } from '../../MogartBase/Api/Api';

function Login() {
  const { updateData, csrfToken } = useData();
  const formRef = useRef<HTMLFormElement>(null);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const formProps = Object.fromEntries(formData);

      try {
        const userData = await login(formProps, csrfToken);
        updateData(userData);
      } catch (error) {
        console.error('Login error:', error);
      }
    }
  };
  
  return (
    <div className="flex h-screen bg-gray-200">
      <div className="flex flex-1 items-center justify-center p-10">
        <div className="w-full max-w-md">
          <form className="bg-white shadow-lg rounded px-12 pt-6 pb-8 mb-4">

            <div className="text-center mb-4">
              <p className="text-gray-700 text-2xl">Welcome back</p>
              <span className="text-sm text-gray-400">Welcome back! Please enter your details.</span>
            </div>

            <div className="mb-4">
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"/>
            </div>

            <div className="mb-6">
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password"/>
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

      <div className="flex-1 hidden lg:block" style={{ backgroundImage: 'url("https://cdn.discordapp.com/attachments/1184268083385348096/1184271012641116251/Mogart-Login-Background-1.png")', backgroundSize: 'cover' }}>
        <div className="flex h-full bg-black bg-opacity-50 items-center justify-center">
          <div className="text-center text-white p-10">
            <h2 className="text-4xl font-bold mb-2">Make an awesome experience</h2>
            <p className="mb-4">Discover yourself in a fleet of awesome designers, to make more awesome creations</p>
            <a href="#" className="text-lg text-indigo-300 hover:underline">Join 14+ users</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
