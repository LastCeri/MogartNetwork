import React from 'react';

interface VoiceCallModalProps {
  isCalling: boolean;
  callStatus: string;
  setIsCalling: (isCalling: boolean) => void;
  profileImage: string;
  name: string;
}

const VoiceCallModal: React.FC<VoiceCallModalProps> = ({
  isCalling,
  callStatus,
  setIsCalling,
  profileImage,
  name,
}) => {
  return (
    isCalling && (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-xl flex flex-col items-center space-y-4" style={{ maxWidth: '400px' }}>
          <img src={profileImage} alt="Profile" className="w-32 h-32 rounded-full border-4 border-blue-500" />
          <h2 className="text-2xl font-bold">{name}</h2>
          <p className="text-lg text-gray-600">{callStatus}</p>
          <div className="flex space-x-4">
            {callStatus === 'Arama başladı' && (
              <button onClick={() => setIsCalling(false)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                end call
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default VoiceCallModal;
