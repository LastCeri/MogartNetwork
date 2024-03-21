// RightSidebar.tsx
import React, { useState } from 'react';
import { UserData } from '../../Profile';
import { faSuperscript, faChevronLeft, faStairs, faUserSecret, faMask,faUserClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ProfileRightSidebarProps {
  userData: UserData | null;
}

const ProfileRightSidebar: React.FC<ProfileRightSidebarProps> = ({ userData }) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const photos = React.useMemo(() => {
    const photoData = userData?.Photos;
    if (!photoData) return [];

    return Array.isArray(photoData) ? photoData : [photoData];
  }, [userData?.Photos]).filter(photo => photo.PhotoURL != null); 

  const openModal = (index: number) => {
    setSelectedPhotoIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const goToPrevious = () => {
    setSelectedPhotoIndex(prevIndex => (prevIndex === 0 ? photos.length - 1 : prevIndex! - 1));
  };

  const goToNext = () => {
    setSelectedPhotoIndex(prevIndex => (prevIndex! + 1) % photos.length);
  };
  return (
    <aside className="w-96 bg-white p-4 rounded-lg shadow space-y-4">
      <div className="bg-white shadow-lg rounded-lg p-4 max-w-sm mx-auto">
          <h2 className="font-semibold text-lg border-b pb-2">Badges</h2>
          <div className="flex flex-wrap items-center mt-2">
            <div className="m-2">
              <span className="inline-block bg-blue-500 text-white text-sm px-3 py-1.5 rounded-full uppercase font-bold tracking-wide shadow">
              <FontAwesomeIcon icon={faUserClock} /> New User
              </span>
            </div>
          </div>
      </div>
      <div className="bg-white shadow-lg rounded-lg p-4 max-w-sm mx-auto">
        <h2 className="font-semibold text-lg border-b pb-2">ABOUT</h2>
        <p className="text-sm mt-2 break-words max-w-xl">
        {userData?.UsrDetail || `Hi, I am ${userData?.UsrName}`}
      </p>
      </div>
      <div className="bg-white shadow-lg rounded-lg p-4 max-w-sm mx-auto">
        <h2 className="font-semibold text-lg border-b pb-2">PHOTOS</h2>
        {photos.length > 0 ? (
            <div className="grid grid-cols-3 gap-2 mt-2">
              {photos.map((photo, index) => (
                <img
                  key={index}
                  className="w-full cursor-pointer"
                  src={photo.PhotoURL}
                  alt={photo.PhotoDescription || 'No description available'}
                  onClick={() => openModal(index)}
                />
              ))}
            </div>
          ) : (
            <p>The user does not have any pictures.</p>
          )}
      </div>
      {isModalOpen && selectedPhotoIndex !== null && (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="relative bg-white rounded-lg shadow-xl overflow-hidden" style={{ maxWidth: '90%', maxHeight: '90vh' }}>
          <img
            src={photos[selectedPhotoIndex].PhotoURL}
            alt="Selected"
            className="w-full h-auto"
          />
          <button onClick={closeModal} className="absolute top-2 right-2 text-gray-100 bg-red-500 hover:bg-red-600 p-2 rounded-full transition-colors duration-300 focus:outline-none focus:ring focus:ring-red-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <button onClick={goToPrevious} className="absolute top-1/2 left-2 transform -translate-y-1/2 text-gray-100 bg-blue-500 hover:bg-blue-600 p-2 rounded-full transition-colors duration-300 focus:outline-none focus:ring focus:ring-blue-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button onClick={goToNext} className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-100 bg-blue-500 hover:bg-blue-600 p-2 rounded-full transition-colors duration-300 focus:outline-none focus:ring focus:ring-blue-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    )}

    </aside>
  );
};

export default ProfileRightSidebar;
