// ProfileMainContent.tsx
import React, { useState } from 'react';
import { UserData, PostType } from '../../../Profile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSliders, faThumbsUp, faComment, faShareNodes } from '@fortawesome/free-solid-svg-icons';

interface ProfileMainContentProps {
  userData: UserData | null;
}

const ProfileMainContent: React.FC<ProfileMainContentProps> = ({ userData }) => {
  const [showCommentInput, setShowCommentInput] = useState(false);

  const handleLike = () => {
    console.log("Like button pressed.");
  };

  const handleComment = () => {
    setShowCommentInput(!showCommentInput);
  };

  const handleShare = () => {
    console.log("Share button pressed.");
  };

  if (!userData) {
    return (
      <main className="flex-1 p-6 overflow-auto">
        <p>No user data available.</p>
      </main>
    );
  }

  if (!userData.Posts) {
    return (
      <main className="flex-1 p-6 overflow-auto">
        <p>No posts available for this user.</p>
      </main>
    );
  }
  let userPosts: PostType[] = [];

  if (Array.isArray(userData?.Posts)) {
    // Filter out posts with null values
    userPosts = userData.Posts.filter((post) => {
      return Object.values(post).some((value) => value !== null);
    });
  } else if (typeof userData?.Posts === 'string') {
    try {

      // Directly use the string without wrapping it in an array
      const parsedPosts = JSON.parse(`[${userData.Posts}]`, (key, value) => {
        // Convert null values to undefined during parsing
        return value === null ? undefined : value;
      });

      if (Array.isArray(parsedPosts)) {
        // Filter out posts with null values
        userPosts = parsedPosts.filter((post) => {
          return Object.values(post).some((value) => value !== null);
        });
      } else {
        // Handle the case where there's a single post with null values
        userPosts = Object.values(parsedPosts).some((value) => value !== null) ? [parsedPosts] : [];
      }
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  }

  return (
    <main className="flex-1 p-6 overflow-auto">
      {userPosts.length === 0 ? (
      <div className="flex items-center justify-center h-full">
      <p className="text-gray-500 text-lg">No posts available.</p>
    </div>
      ) : (
        userPosts.map((post) => (
          <div key={post.GlobalId} className="bg-white rounded-lg shadow-lg mb-8 p-4 text-gray-700">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <img className="h-8 w-8 rounded-full mr-2" src={post.Avatar || 'default-avatar-url'} alt={`${post.Author}'s avatar`} />
                <div>
                  <div className="font-medium">{post.Author}</div>
                  <div className="text-xs text-gray-500">{post.Date}</div>
                </div>
              </div>
              <div className="text-gray-500 hover:text-gray-700 cursor-pointer">
                <FontAwesomeIcon icon={faSliders} />
              </div>
            </div>
            <p className="mb-3">{post.Content}</p>
            <div className="border-t pt-3 mt-3 text-sm flex p-2 justify-start items-center">
              <button type="button" onClick={handleLike} className="text-gray-500 hover:text-blue-600 focus:outline-none mr-2">
                <FontAwesomeIcon icon={faThumbsUp} className="mr-1" /> Like
              </button>
              <button type="button" onClick={handleComment} className="text-gray-500 hover:text-green-600 focus:outline-none mx-2">
                <FontAwesomeIcon icon={faComment} className="mr-1" /> Comment
              </button>
              <div className="flex-grow"></div>
              <button type="button" onClick={handleShare} className="text-gray-500 hover:text-red-600 focus:outline-none">
                <FontAwesomeIcon icon={faShareNodes} className="mr-1" /> Share
              </button>
            </div>
            {showCommentInput && (
              <div className="pt-2">
                <input
                  type="text"
                  placeholder="Type a comment..."
                  className="w-full p-2 text-sm text-gray-500 rounded-lg border focus:outline-none focus:border-blue-500"
                  autoFocus
                />
              </div>
            )}
          </div>
        ))
      )}
    </main>
  );
};

export default ProfileMainContent;
