import React from 'react';
import { UserData } from '../../../Profile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faShareNodes, faThumbsUp } from '@fortawesome/free-solid-svg-icons';


interface ProfileMainContentProps {
    userData: UserData | null;
  }
  
  const ProfilePhotosContent: React.FC<ProfileMainContentProps> = ({ userData }) => {
    const photos = React.useMemo(() => {
      const photoData = userData?.Photos;
      if (!photoData) return [];
  
      return Array.isArray(photoData) ? photoData : [photoData];
    }, [userData?.Photos]).filter(photo => photo.PhotoURL != null);

    return (
        <main className="flex-1 p-6 overflow-auto">
          {photos.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500 text-lg">No photos available.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {photos.map((photo, index) => (
                <div key={index} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 ease-in-out overflow-hidden">
                  <img src={photo.PhotoURL} alt="User Photo" className="w-full h-auto" />
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <button className="text-gray-500 hover:text-blue-600 focus:outline-none">
                        <FontAwesomeIcon icon={faThumbsUp} /> Like
                      </button>
                      <button className="text-gray-500 hover:text-green-600 focus:outline-none">
                        <FontAwesomeIcon icon={faComment} /> Comment
                      </button>
                      <button className="text-gray-500 hover:text-red-600 focus:outline-none">
                        <FontAwesomeIcon icon={faShareNodes} /> Share
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      );
    };
    
    export default ProfilePhotosContent;