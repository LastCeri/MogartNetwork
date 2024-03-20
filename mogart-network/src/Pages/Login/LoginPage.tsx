import React, { useState,useEffect, useRef } from 'react';
import { SiteData, useData } from '../../MogartBase/Context/DataContext';
import { API_URL, login } from '../../MogartBase/Api/Api';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { checkMinaProvider, requestAccounts } from '../../MogartBase/WalletProc/Wallet';

function Login() {
  const navigate = useNavigate();
  const { userAuthID, setUserAuthID } = useData();
  const { userAuthToken, setUserAuthToken } = useData();
  const { isLoggedIn, setLoginStatus } = useData();
  const { siteData,setSiteData,data, updateData } = useData();
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
        console.error('Error fetching site data:', error);
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
    setRememberMe(event.target.checked);
  };

  const handleWalletLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    const providerResponse = await checkMinaProvider(); 
    
    if (providerResponse === true) {
      console.log("Provider Found, proceeding with WalletLogin...");
      const walletAddress = await requestAccounts();
      try{

        const response = await login({walletAddress});
        const { message, status, token, userId, userData } = response;
        
        if (status === "Ok") {
          setUserAuthToken(token);
          setLoginSuccess(true);
          setLoginStatus(true);
          setUserAuthID(userId);
          updateData(userData);
          setTimeout(() => navigate('/'), 2500);
        }else if (status === "alreadylogged"){
          navigate('/');
        }else if (status === "Bad Request") {
          setErrorMessage(message);
        } else if (status === "Not Found") {
          setErrorMessage(message);
        }else {
          setErrorMessage(message || "An error occurred during login.");
        }

      }catch (error) {
        console.error(error);
        setErrorMessage('An error occurred during login.');
      }
    } else {
      console.log("Provider not found, please log in with a provider.");
    }
  };
 

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const formProps = Object.fromEntries(formData.entries());
  
      if (!formData.has('email') || !formData.has('password')) {
        setErrorMessage("Please fill in all fields.");
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
        return;
      }
  
      try {
        const response = await login({email, password});
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
        } else if (status === "Not Found") {
          setErrorMessage(message);
        }else {
          setErrorMessage(message || "An error occurred during login.");
        }
      } catch (error) {
        console.error(error);
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
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="email" id="email" type="text" placeholder="Email" />
            </div>

            <div className="mb-6">
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" name="password" id="password" type="password" placeholder="Password" />
            </div>

            <div className="flex items-center justify-between mb-6">
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox text-indigo-600" checked={rememberMe} onChange={handleRememberMe} />
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
            </div> <p className='mb-6 text-center'>OR</p>
            <div className="mb-6">
              <button onClick={handleWalletLogin} className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
               Wallet Connect
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
