// RightSidebar.tsx
import React from 'react';
import { UserData } from '../../Profile';

interface ProfileRightSidebarProps {
  userData: UserData | null;
}

const ProfileRightSidebar: React.FC<ProfileRightSidebarProps> = ({ userData }) => {
  const photos = [
    'https://images.ctfassets.net/hrltx12pl8hq/3Z1N8LpxtXNQhBD5EnIg8X/975e2497dc598bb64fde390592ae1133/spring-images-min.jpg',
    'https://cdn.pixabay.com/photo/2015/06/19/21/24/avenue-815297_640.jpg',
    'https://img.freepik.com/free-photo/space-background-realistic-starry-night-cosmos-shining-stars-milky-way-stardust-color-galaxy_1258-154643.jpg',
  ];

  return (
    <aside className="w-96 bg-white p-4 rounded-lg shadow space-y-4">
      <div>
        <h2 className="font-semibold text-lg border-b pb-2">ABOUT</h2>
        <p className="text-sm mt-2">
          Hello everyone. I am DarkRice. I am from Earth. Acting MetaFans Community Instructor
        </p>
      </div>
      <div>
        <h2 className="font-semibold text-lg border-b pb-2">PHOTOS</h2>
        <div className="grid grid-cols-3 gap-2 mt-2">
          {photos.map((photo, index) => (
            <img
              key={index}
              className="w-64 h-16 rounded-md"
              src={photo}
              alt={`Gallery ${index}`}
            />
          ))}
        </div>
      </div>
    </aside>
  );
};

export default ProfileRightSidebar;
