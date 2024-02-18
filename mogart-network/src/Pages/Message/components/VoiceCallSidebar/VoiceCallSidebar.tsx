import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStickyNote, faSearch, faAdjust } from '@fortawesome/free-solid-svg-icons';

const VoiceCallSidebar: React.FC = () => {
  return (
    <div className="fixed left-0 top-50 z-50 p-4 bg-white bg-opacity-90 shadow-xl rounded-r-3xl flex flex-col items-center justify-start space-y-4">
      <button className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-150 ease-in-out">
        <FontAwesomeIcon icon={faStickyNote} size="lg" />
      </button>
      <button className="p-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition duration-150 ease-in-out">
        <FontAwesomeIcon icon={faSearch} size="lg" />
      </button>
      <button className="p-3 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition duration-150 ease-in-out">
        <FontAwesomeIcon icon={faAdjust} size="lg" />
      </button>
    </div>
  );
};

export default VoiceCallSidebar;
