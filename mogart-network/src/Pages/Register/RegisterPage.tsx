import React, { useRef,useState } from 'react';
import { useData } from '../../MogartBase/Context/DataContext';
import { register } from '../../MogartBase/Api/Api';
import { useNavigate } from 'react-router-dom';

function Register() {
  const { csrfToken } = useData();
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMessage('');

    console.log("test");
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const formProps = Object.fromEntries(formData);

      console.log("test2", formProps);


      if (!formProps.email || !formProps.username || !formProps.password || !formProps.passwordConfirm) {
        setErrorMessage("Please fill in all fields.");
        return;
      }

      if (formProps.password !== formProps.passwordConfirm) {
        console.error("Passwords do not match");
        return;
      }

      try {
        const response = await register(formProps, csrfToken);
        console.log(response);
        setRegistrationSuccess(true);
        setTimeout(() => navigate('/login'), 3000); 
      } catch (error) {
        console.error('Registration error:', error);
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-200">

      <div className="flex flex-1 items-center justify-center p-10">
        <div className="w-full max-w-md">
          <form ref={formRef} className="bg-white shadow-lg rounded px-12 pt-6 pb-8 mb-4">

            <div className="text-center mb-4">
              <p className="text-gray-700 text-2xl">Register</p>
              <span className="text-sm text-gray-400">Enter the details for your new account.</span>
            </div>

            <div className="mb-4">
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="email" id="email" type="email" placeholder="E-mail" required />
            </div>

            <div className="mb-4">
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="username" id="username" type="text" placeholder="Username" required/>
            </div>

            <div className="mb-4">
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" name="password" id="password" type="password" placeholder="Password" required/>
            </div>

            <div className="mb-6">
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="passwordConfirm" id="passwordConfirm" type="password" placeholder="Confirm Password" required/>
            </div>

            <div className="mb-6">
              <button onClick={handleRegister} className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
               Register
              </button>
            </div>

            <p className='mb-6 text-center'>OR</p>

            <div className="mb-6">
              <button onClick={handleRegister} className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
               Wallet Connect
              </button>
            </div>

            <div className="text-center">
              <a href="/login" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
               Already have an account? Login
              </a>
            </div>
          </form>
        </div>
      </div>

      <div className="flex-1 hidden lg:block" style={{ backgroundImage: 'url("https://cdn.discordapp.com/attachments/1184268083385348096/1184271013316403271/Mogart-Register-Background-1.png")', backgroundSize: 'cover' }}>
        <div className="flex h-full bg-black bg-opacity-50 items-center justify-center">
          <div className="text-center text-white p-10">
            <h2 className="text-4xl font-bold mb-2">Let's Do Great Things Together</h2>
            <p className="mb-4">Meet amazing designers and create more amazing creations.</p>
            <a href="#" className="text-lg text-indigo-300 hover:underline">Join to community</a>
          </div>
        </div>
      </div>

      {registrationSuccess && (
        <div className="fixed bottom-0 inset-x-0 mb-6 flex justify-center">
          <div className="bg-green-500 text-white font-bold py-2 px-4 rounded-full shadow-lg">
            Congratulations! Registration Completed Successfully. You are being directed.
          </div>
        </div>
      )}

    </div>
  );
}

export default Register;
