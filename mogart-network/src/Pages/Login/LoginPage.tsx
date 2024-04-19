import React, { useState,useEffect, useRef } from 'react';
import { SiteData, useData } from '../../MogartBase/Context/DataContext';
import { API_URL, Postlogin } from '../../MogartBase/Api/Api';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { checkMinaProvider, requestAccounts } from '../../MogartBase/WalletProc/Wallet';

function Login() {
  const navigate = useNavigate();
  const { userAuthID, setUserAuthID } = useData();
  const { userAuthToken, setUserAuthToken } = useData();
  const { isLoggedIn, setLoginStatus } = useData();
  const { siteData, setSiteData, data, updateData } = useData();
  const formRef = useRef<HTMLFormElement>(null);
  const [LoginSuccess, setLoginSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [rememberMe, setRememberMe] = useState(false);


  useEffect(() => {
    axios.get<SiteData[]>(`${API_URL}/MogartSiteData`)
      .then(response => {
        const siteData: SiteData = response.data[0];
        setSiteData(siteData);
      })
      .catch(error => {
        if (error.code === "ERR_NETWORK") {
          console.error('Network error:', error);
          navigate('/NetworkError');
        } else if (error.response) {
          console.error('MogartSiteData data fetching failed:', error.response.data);
        } else {
          console.error('Error:', error.message);
        }
      });

      const savedEmail = localStorage.getItem('rememberuserEmail');
      if (savedEmail) {
        const emailInput = formRef.current?.elements.namedItem('email') as HTMLInputElement;
        if (emailInput) {
          emailInput.value = savedEmail;
          setRememberMe(true);
        }
      }
  }, [setSiteData]);

  const handleRememberMe = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setRememberMe(isChecked);
    if (isChecked) {
      const emailInput = formRef.current?.elements.namedItem('email') as HTMLInputElement;
      if (emailInput && emailInput.value) {
        localStorage.setItem('rememberuserEmail', emailInput.value);
        localStorage.setItem('rememberMe', 'true');
      }
    } else {
      localStorage.removeItem('rememberuserEmail');
      localStorage.removeItem('rememberMe');
    }
  };

  const handleWalletLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    const providerResponse = await checkMinaProvider(); 
    
    if (providerResponse === true) {
      try{ 
        const walletAddress = await requestAccounts();
        if(!walletAddress)
        {  throw new Error('Failed to retrieve wallet address. Please check your wallet extension.');}     
        
        const response = await Postlogin({walletAddress});
        const { message, status, token, userId, userdata } = response;
        
        if (status === "Ok") {
          setUserAuthToken(token);
          setLoginSuccess(true);
          setLoginStatus(true);
          setUserAuthID(userId);
          updateData(userdata);
          setTimeout(() => navigate('/'), 2500);
        }else if (status === "alreadylogged"){
          navigate('/');
        }else if (status === "Bad Request") {
          setErrorMessage(message);
          setTimeout(() => setErrorMessage(""), 2500)
        } else if (status === "Not Found") {
          setErrorMessage(message);
          setTimeout(() => setErrorMessage(""), 2500)
        }else {
          setErrorMessage(message || "An error occurred during login.");
          setTimeout(() => setErrorMessage(""), 2500)
        }

      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error);
          setErrorMessage(error.message);
          setTimeout(() => setErrorMessage(""), 2500)
        } else {
          console.error("An unknown error occurred");
          setErrorMessage("An unknown error occurred");
          setTimeout(() => setErrorMessage(""), 2500)
        }
      }
    } else {
      setErrorMessage("Provider not found, please log in with a provider.");
      setTimeout(() => setErrorMessage(""), 2500)
    }
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const formProps = Object.fromEntries(formData.entries());
  
      if (!formData.has('email') || !formData.has('password')) {
        setErrorMessage("Please fill in all fields.");
        setTimeout(() => setErrorMessage(""), 2500)
        return;
      }
      const email = formData.get('email') as string; 
      const password = formData.get('password') as string;
      if (rememberMe && email) {
        localStorage.setItem('rememberuserEmail', email);
      } else {
        localStorage.removeItem('rememberuserEmail');
      }
      if (!email || !password) {
        setErrorMessage("Please fill in all fields.");
        setTimeout(() => setErrorMessage(""), 2500)
        return;
      }
      try {
        const response = await Postlogin({email, password});
        const { message, status, token, userId, userdata } = response;

        if (status === "Ok") {
          setUserAuthToken(token);
          setLoginSuccess(true);
          setLoginStatus(true);
          setUserAuthID(userId);
          updateData(userdata);
          setTimeout(() => navigate('/'), 2500);
        }else if (status === "alreadylogged"){
          setErrorMessage(message);
          setTimeout(() => setErrorMessage(""), 2500)
          setTimeout(() => navigate('/'), 2500)
        }else if (status === "Bad Request") {
          setErrorMessage(message);
          setTimeout(() => setErrorMessage(""), 2500)
        } else if (status === "Not Found") {
          setErrorMessage(message);
          setTimeout(() => setErrorMessage(""), 2500)
        }else {
          setErrorMessage(message || "An error occurred during login.");
          setTimeout(() => setErrorMessage(""), 2500)
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error);
          setErrorMessage(error.message);
          setTimeout(() => setErrorMessage(""), 2500)
        } else {
          console.error("An unknown error occurred");
          setErrorMessage("An unknown error occurred");
          setTimeout(() => setErrorMessage(""), 2500)
        }
      }
    }
  };
  
  return (
    <div className="flex h-screen bg-gray-200">
      <div className="flex flex-1 items-center justify-center p-10">
        <div className="w-full max-w-md">
          <form ref={formRef} className="bg-white shadow-lg rounded px-12 pt-6 pb-8 mb-4">
            <div className="text-center mb-8">
              <p className="text-gray-800 text-3xl font-semibold">Welcome Back</p>
              <span className="text-md text-gray-500">Please enter your details.</span>
              <div className="mt-4 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </div>
            <div className="mb-4">
              <input className="shadow-lg appearance-none border-0 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-150 ease-in-out" name="email" id="email" type="email" placeholder="Email" />
            </div>

            <div className="mb-6">
              <input className="shadow-lg appearance-none border-0 rounded-lg w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-150 ease-in-out" name="password" id="password" type="password" placeholder="Password" />
            </div>

            <div className="flex items-center justify-between mb-6">
              <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" className="form-checkbox text-indigo-600 w-4 h-4 rounded border-gray-300 focus:ring-indigo-500 focus:border-indigo-500" checked={rememberMe} onChange={handleRememberMe} />
                <span className="ml-2 text-gray-700 hover:text-gray-700 transition duration-150 ease-in-out">Remember me</span>
              </label>
              <a href="/LostPassword" className="inline-block align-baseline font-semibold text-sm text-indigo-600 hover:text-indigo-800 transition duration-150 ease-in-out">
                Lost your password?
              </a>
            </div>

            <div className="mb-2">
              <button onClick={handleLogin} className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 shadow-lg transform hover:scale-105 transition duration-150 ease-in-out" type="button">
                Login
              </button>
            </div> 
            <p className='mb-2 text-center text-gray-600'>OR</p>
            <div className="mb-2">
              <button onClick={handleWalletLogin} className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-opacity-50 shadow-lg transform hover:scale-105 transition duration-150 ease-in-out" type="button">
                Wallet Connect
              </button>
            </div>
            <div className="text-center mt-6">
              <a href="/register" className="inline-block align-baseline font-bold text-sm text-gray-700 hover:text-gray-900 transition duration-150 ease-in-out">
                Register
              </a>
            </div>
          </form>
        </div>
      </div>

      <div className="flex-1 hidden lg:block" style={{ backgroundImage: `url('${siteData.SiteLoginBackgroundURL}')`, backgroundSize: 'cover' }}>
        <div className="flex h-full bg-black bg-opacity-50 items-center justify-center">
          <div className="text-center text-white p-10">
            <h2 className="text-4xl font-bold mb-2">Make an awesome experience</h2>
            <p className="mb-4">Discover yourself in a fleet of awesome designers, to make more awesome creations</p>
            <a href="https://discord.gg/pvzvemERKK" className="text-lg text-indigo-300 hover:underline">Join 14+ users</a>
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
