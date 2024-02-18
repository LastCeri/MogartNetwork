import React, { ChangeEvent, useState } from 'react';
import { useData } from '../../../../MogartBase/Context/DataContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStickyNote, faSearch, faAdjust, faGear } from '@fortawesome/free-solid-svg-icons';

const VoiceCallSidebar: React.FC = () => {
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const { voiceDetectionLevel, setVoiceDetectionLevel } = useData();

  const toggleSettings = () => {
    setIsSettingsVisible(!isSettingsVisible);
  };

  const handleDetectionLevelChange = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const newLevel = Number(e.target.value);
      setVoiceDetectionLevel(newLevel);
    } catch (error) {
     
      console.error("An error occurred in the setVoiceDetectionLevel function: ", error);
    }
  };
  

  return (
  <>
    <div className="fixed left-0 top-1/2 transform -translate-y-1/2 z-50 p-4 bg-white bg-opacity-90 shadow-xl rounded-r-3xl flex flex-col items-center justify-start space-y-4">
      <button className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-150 ease-in-out">
        <FontAwesomeIcon icon={faStickyNote} size="lg" />
      </button>
      <button className="p-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition duration-150 ease-in-out">
        <FontAwesomeIcon icon={faSearch} size="lg" />
      </button>
      <button className="p-3 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition duration-150 ease-in-out">
        <FontAwesomeIcon icon={faAdjust} size="lg" />
      </button>
      <button onClick={toggleSettings} className="p-3 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition duration-150 ease-in-out">
        <FontAwesomeIcon icon={faGear} size="lg" />
      </button>
    </div>
          {isSettingsVisible && (
           <div className="fixed left-20 top-1/2 transform -translate-y-1/2 z-50 p-4 bg-white bg-opacity-90 shadow-xl rounded-r-3xl flex flex-col items-center justify-start space-y-4">
              <h3 className="text-lg font-semibold">Settings</h3>
              <label htmlFor="detectionLevel" className="block mt-4">
                Voice Sensivity:
                <input
                  type="range"
                  id="detectionLevel"
                  name="detectionLevel"
                  min="5"
                  max="100"
                  value={voiceDetectionLevel}
                  onChange={handleDetectionLevelChange}
                  className="w-full"
                />
              </label>
              <p>{voiceDetectionLevel}</p>
            </div>
          )}
          </>
  );
};

export default VoiceCallSidebar;
