import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import VoiceCallSidebar from '../VoiceCallSidebar/VoiceCallSidebar';
import { faPhoneSlash, faMicrophone, faMicrophoneSlash, faHeadphones, faHeadphonesAlt } from '@fortawesome/free-solid-svg-icons';

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
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isHeadphonesMuted, setIsHeadphonesMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(0); 

  const toggleMic = () => setIsMicMuted(!isMicMuted);
  const toggleHeadphones = () => setIsHeadphonesMuted(!isHeadphonesMuted);


  useEffect(() => {
    let interval:any;
    if (isCalling && callStatus === 'Chat Connection Started') {
      interval = setInterval(() => {
        setCallDuration((prevDuration) => prevDuration + 1);
      }, 1000); 
    } else {
      setCallDuration(0);
    }

    return () => clearInterval(interval); 
  }, [isCalling, callStatus]);

  const formatDuration = (seconds:any) => {
    const pad = (num:any) => (num < 10 ? `0${num}` : num);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
  };

  return (
    isCalling && (
      <>
      <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex justify-center items-center">
      <VoiceCallSidebar />
        <div className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col items-center space-y-4" style={{ maxWidth: '700px', maxHeight: '800px' }}>
          <img src={profileImage} alt="Profile" className="w-32 h-32 rounded-full border-4 border-blue-500 object-cover" />
          <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
          <p className="text-lg text-gray-500">{callStatus} - {formatDuration(callDuration)}</p>
          <div className="flex space-x-4 justify-center">
            {callStatus === 'Chat Connection Started' && (
              <>  
                <button onClick={toggleMic} className={`flex items-center ${isMicMuted ? 'bg-gray-400 hover:bg-gray-500' : 'bg-green-500 hover:bg-green-600'} text-white font-bold py-2 px-4 rounded-full shadow-lg hover:shadow-xl transition duration-150 ease-in-out`}>
                  <FontAwesomeIcon icon={isMicMuted ? faMicrophoneSlash : faMicrophone} className="mr-2" />
                  {isMicMuted ? 'Unmute Mic' : 'Mute Mic'}
                </button>
                <button onClick={() => setIsCalling(false)} className="flex items-center bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:shadow-xl transition duration-150 ease-in-out">
                  <FontAwesomeIcon icon={faPhoneSlash} className="mr-2" />
                  End Call
                </button>
                <button onClick={toggleHeadphones} className={`flex items-center ${isHeadphonesMuted ? 'bg-gray-400 hover:bg-gray-500' : 'bg-blue-500 hover:bg-blue-600'} text-white font-bold py-2 px-4 rounded-full shadow-lg hover:shadow-xl transition duration-150 ease-in-out`}>
                  <FontAwesomeIcon icon={isHeadphonesMuted ? faHeadphonesAlt : faHeadphones} className="mr-2" />
                  {isHeadphonesMuted ? 'Unmute Headphones' : 'Mute Headphones'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      </>
    )
  );
};

export default VoiceCallModal;
