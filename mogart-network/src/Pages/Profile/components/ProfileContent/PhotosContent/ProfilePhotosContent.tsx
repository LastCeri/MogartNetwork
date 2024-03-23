import React, { useState } from 'react';
import { UserData } from '../../../Profile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faShareNodes, faThumbsUp, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useData } from '../../../../../MogartBase/Context/DataContext';

interface ProfileMainContentProps {
  userData: UserData | null;
}

const ProfilePhotosContent: React.FC<ProfileMainContentProps> = ({ userData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<any>(null);
  const { isLoggedIn, isLoading, data,siteData } = useData();

  const photos = React.useMemo(() => {
    const photoData = userData?.Photos;
    if (!photoData) return [];

    return Array.isArray(photoData) ? photoData : [photoData];
  }, [userData?.Photos]).filter(photo => photo.PhotoURL != null);

  const openModal = (photo:any) => {
    setSelectedPhoto(photo);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <main className="flex-1 px-6 py-8 overflow-auto bg-gray-50">
      {photos.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">No photos available.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-8">
          {photos.map((photo, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow ease-in-out duration-300">
              <img src={photo.PhotoURL} alt="User Photo" className="w-full h-40 object-cover hover:scale-110 transition-transform duration-300 cursor-pointer" onClick={() => openModal(photo)} />
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-lg font-semibold text-gray-800">{photo.UploadDate}</p>
                </div>
                <p className="text-sm text-gray-600 mb-3">{photo.PhotoDescription}</p>
                <div className="flex items-center justify-between">
                  <button className="flex items-center text-gray-600 hover:text-blue-600">
                    <FontAwesomeIcon icon={faThumbsUp} className="mr-2" /> Like
                  </button>
                  <button className="flex items-center text-gray-600 hover:text-green-600">
                    <FontAwesomeIcon icon={faComment} className="mr-2" /> Comment
                  </button>
                  <button className="flex items-center text-gray-600 hover:text-red-600">
                    <FontAwesomeIcon icon={faShareNodes} className="mr-2" /> Share
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
     {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center px-4 py-6">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full">
            <div className="flex justify-between items-center border-b border-gray-100 p-4">
              <span className="text-lg font-medium text-gray-900">Photo Details</span>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-800 p-2 rounded-md transition-colors duration-200">
                <FontAwesomeIcon icon={faTimes} size="lg" />
              </button>
            </div>
            {selectedPhoto && (
              <>
                <div className="relative">
                  <img src={selectedPhoto.PhotoURL} alt="Selected" className="w-full h-auto max-h-96 object-contain rounded-lg shadow-md mr-4 mb-4 md:mb-0" />
                </div>
                <div className="flex flex-col md:flex-row items-start p-6">
                  <img src={userData?.UsrProfileImage || siteData?.SiteDefaultProfileImageURL} alt={`${userData?.UsrDisplayName}'s profile`} className="h-16 w-16 rounded-full object-cover shadow-md mr-4 mb-4 md:mb-0" />
                  <div>
                    <p className="text-xl font-semibold text-gray-800">{selectedPhoto.UploadDate}</p>
                    <p className="text-md text-gray-600 mt-2">{selectedPhoto.PhotoDescription}</p>
                  </div>
                </div>
                <div className="px-6 py-4 bg-gray-50">
                <div className="flex space-x-2">
                  <button className="flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1">
                    <FontAwesomeIcon icon={faThumbsUp} className="mr-2" /> Like
                  </button>
                  <button className="flex items-center justify-center bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg shadow hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1">
                    <FontAwesomeIcon icon={faComment} className="mr-2" /> Comment
                  </button>
                  <button className="flex items-center justify-center bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1">
                    <FontAwesomeIcon icon={faShareNodes} className="mr-2" /> Share
                  </button>
                </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default ProfilePhotosContent;
