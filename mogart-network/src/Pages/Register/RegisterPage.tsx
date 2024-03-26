import React, { useEffect, useRef,useState } from 'react';
import { SiteData, useData } from '../../MogartBase/Context/DataContext';
import { API_URL, register } from '../../MogartBase/Api/Api';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { checkMinaProvider, requestAccounts } from '../../MogartBase/WalletProc/Wallet';

function Register() {
  const { csrfToken } = useData();
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { siteData,setSiteData,data, updateData } = useData();


  useEffect(() => {
    axios.get<SiteData[]>(`${API_URL}/MogartSiteData`)
      .then(response => {
        const siteData: SiteData = response.data[0];
        setSiteData(siteData);
      })
      .catch(error => {
        console.error('Error fetching site data:', error);
      });
  }, [setSiteData]);


  const handleWalletRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage('');
    setRegistrationSuccess(false);
    
    try {
      const providerResponse = await checkMinaProvider(); 
      if (!providerResponse) {
        throw new Error('Mina provider not found. Please ensure the wallet extension is installed.');
      }
      console.log("Provider found, proceeding with WalletRegister...");
      const walletAddress = await requestAccounts();
  
      if (!walletAddress) {
        throw new Error('Failed to retrieve wallet address. Please check your wallet extension.');
      }
  
      const registrationResponse = await register({walletAddress});
      const { message, status} = registrationResponse;
        
      if (!status) {
        throw new Error(registrationResponse.message || 'Registration failed with an unspecified error.');
      }
      if (status === "Success") {
        setRegistrationSuccess(true);
      }else if (status === "Conflict"){
        setErrorMessage(message);
      }else if (status === "Error") {
        setErrorMessage(message);
      } else if (status === "Bad Request") {
        setErrorMessage(message);
      }else {
        setErrorMessage(message || "An error occurred during login.");
      }
      setTimeout(() => navigate('/login'), 3000);
    } catch (error) {
      console.error('Registration error:', error);
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred during registration.');
    }
  };
  

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage('');
    setRegistrationSuccess(false);

    if (formRef.current) {
      const formData = new FormData(formRef.current);
      if (!formData.has('email') || !formData.has('username') || !formData.has('password') || !formData.has('passwordConfirm')) {
        setErrorMessage("Please fill in all fields.");
        return;
      }
      const email = formData.get('email') as string;
      const username = formData.get('username') as string;
      const password = formData.get('password') as string;
      const passwordConfirm = formData.get('passwordConfirm') as string;

      if (password !== passwordConfirm) {
        setErrorMessage("Passwords do not match");
        return;
      }
      
      try {
        const response = await register({ email, username, password, walletAddress: "" });
        if (response.status === "Success") {
          setRegistrationSuccess(true);

          setTimeout(() => navigate('/login'), 3000);
        } else {
          setErrorMessage(response.message || 'Registration failed with an unspecified error.');
        }
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          if (error.code === "ERR_NETWORK") {
            console.error('Network error:', error);
            navigate('/NetworkError');
          } else if (error.response) {
            console.error('Register failed:', error.response.data);
          } else {
            console.error('Error:', error.message);
          }
        } else {
          console.error('An unexpected error occurred', error);
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
            <p className="text-gray-800 text-3xl font-bold">Register</p>
            <span className="text-md text-gray-500">Enter the details for your new account.</span>
            <div className="mt-4 w-full h-1 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded-full"></div>
          </div>

            <div className="mb-2">
              <input className="shadow-lg appearance-none border-2 border-gray-200 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all ease-in-out duration-150" name="email" id="email" type="email" placeholder="E-mail" required />
            </div>
            <div className="mb-2">
              <input className="shadow-lg appearance-none border-2 border-gray-200 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all ease-in-out duration-150" name="username" id="username" type="text" placeholder="Username" required/>
            </div>
            <div className="mb-2">
              <input className="shadow-lg appearance-none border-2 border-gray-200 rounded-lg w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all ease-in-out duration-150" name="password" id="password" type="password" placeholder="Password" required/>
            </div>
            <div className="mb-2">
              <input className="shadow-lg appearance-none border-2 border-gray-200 rounded-lg w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all ease-in-out duration-150" name="passwordConfirm" id="passwordConfirm" type="password" placeholder="Confirm Password" required/>
            </div>
            <div className="mb-">
              <button onClick={handleRegister} className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 transform transition-all duration-150 ease-in-out" type="button">
                Register
              </button>
            </div>

            <p className='mb-2 text-center text-gray-600'>OR</p>

            <div className="mb-2">
              <button onClick={handleWalletRegister} className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-opacity-50 transform transition-all duration-150 ease-in-out" type="button">
                Wallet Register
              </button>
            </div>
            <div className="text-center mt-2">
              <a href="/login" className="inline-block align-baseline font-bold text-sm text-gray-700 hover:text-gray-900 transition duration-150 ease-in-out">
                Already have an account? Login
              </a>
            </div>
          </form>
        </div>
      </div>

      <div className="flex-1 hidden lg:block" style={{ backgroundImage: `url('${siteData?.SiteRegisterBackgroundURL}')`, backgroundSize: 'cover' }}>
        <div className="flex h-full bg-black bg-opacity-50 items-center justify-center">
          <div className="text-center text-white p-10">
            <h2 className="text-4xl font-bold mb-2">Let's Do Great Things Together</h2>
            <p className="mb-4">Meet amazing designers and create more amazing creations.</p>
            <a href="https://discord.gg/pvzvemERKK" className="text-lg text-indigo-300 hover:underline">Join to community</a>
          </div>
        </div>
      </div>

      {errorMessage && (
         <div className="fixed bottom-0 inset-x-0 mb-6 flex justify-center">
         <div className="bg-red-500 text-white font-bold py-2 px-4 rounded-full shadow-lg">
           <p>{errorMessage}</p>
         </div>
       </div>
      )}

      {registrationSuccess && (
        <div className="fixed bottom-0 inset-x-0 mb-6 flex justify-center">
          <div className="bg-green-500 text-white font-bold py-2 px-4 rounded-full shadow-lg">
            <p>Registration successful! You are being directed.</p>
          </div>
        </div>
      )}


    </div>
  );
}

export default Register;
