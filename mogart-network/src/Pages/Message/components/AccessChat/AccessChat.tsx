import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';

interface UnlockPopupProps {
  onRequestAccounts: () => void;
  isVisible: boolean;
  onClose: () => void;
}

const UnlockPopup: React.FC<UnlockPopupProps> = ({ onRequestAccounts, isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-85 flex justify-center items-center backdrop-filter backdrop-blur-sm z-10">
      <div className="bg-white p-8 rounded-lg shadow-xl flex flex-col items-center space-y-4 transition duration-300 ease-out">
        <a href='https://minaprotocol.com/' target='_blank'><img src="https://lib.mogartnetwork.deswu.co/System-Images/Default-Images/Mogart-minaToken.jpg" alt="Mina Protocol Logo" className="w-24 h-24 transition transform scale-100 hover:scale-110 ease-out" /></a>
  
        <p className="text-lg text-gray-700">Welcome! The messaging between users can only be conducted through the wallet</p>
  
        <button
          onClick={() => { onRequestAccounts();}}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-md hover:shadow-lg text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-110 focus:outline-none"
        >
          <FontAwesomeIcon icon={faLock} className="text-3xl transition transform rotate-0 hover:rotate-90 ease-out" />
        </button>
  
        <button onClick={onClose} className="text-xs text-red-500 hover:text-red-700 transition-colors duration-300 ease-out">
          Close
        </button>
      </div>
    </div>
  );
  
};

export default UnlockPopup;
