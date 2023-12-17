// ProfileMainContent.tsx
import React from 'react';

const userPosts = [
  {
    id: 1,
    title: 'Post Title 1',
    timestamp: '2 weeks ago',
    content: 'Your daily dose of culture — with photography showcasing the best in art, music, and literature from around the world.',
    imageUrl: 'https://example.com/path-to-image1.jpg',
  },
  {
    id: 2,
    title: 'Post Title 2',
    timestamp: '1 month ago',
    content: 'Exploring the unexplored — a journey into the wild.',
    imageUrl: 'https://example.com/path-to-image2.jpg',
  },
];

const ProfileMainContent = () => {
  return (
    <main className="flex-1 p-6 overflow-auto">
      <div className="bg-white rounded-lg shadow-lg space-y-6 p-6">
        {userPosts.map(post => (
          <div key={post.id} className="border-b pb-4 mb-4">
            {post.imageUrl && (
              <img
                className="w-full h-auto rounded-lg mb-2"
                src={post.imageUrl}
                alt={post.title}
              />
            )}
            <h3 className="text-xl font-bold">{post.title}</h3>
            <p className="text-gray-500 text-sm">{post.timestamp}</p>
            <p className="text-gray-800 mt-2">{post.content}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default ProfileMainContent;
