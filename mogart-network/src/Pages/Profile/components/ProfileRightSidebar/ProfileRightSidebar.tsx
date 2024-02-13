// RightSidebar.tsx
import React, { useState } from 'react';
import { UserData } from '../../Profile';
import { faChevronRight, faChevronLeft, faXmark } from '@fortawesome/free-solid-svg-icons';
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
      <div>
        <h2 className="font-semibold text-lg border-b pb-2">ABOUT</h2>
        <p className="text-sm mt-2">
        {userData?.UsrDetail || `Hi, I am ${userData?.UsrName}`}
      </p>
      </div>
      <div>
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div 
            className="relative bg-white p-4 rounded-lg overflow-auto" 
            style={{ width: '600px', height: 'auto', maxWidth: '90%', maxHeight: '90vh' }}
          >
            <img
              src={photos[selectedPhotoIndex].PhotoURL}
              alt="Selected"
              className="rounded-md"
              style={{ maxWidth: '100%', maxHeight: '70vh', objectFit: 'contain' }}
            />
            <button onClick={closeModal} className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded hover:bg-red-700">
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <button onClick={goToPrevious} className="absolute left-2 top-1/2 bg-blue-500 text-white p-2 rounded hover:bg-blue-700">
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button onClick={goToNext} className="absolute right-2 top-1/2 bg-blue 500 text-white p-2 rounded hover:bg-blue-700">
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};

export default ProfileRightSidebar;
