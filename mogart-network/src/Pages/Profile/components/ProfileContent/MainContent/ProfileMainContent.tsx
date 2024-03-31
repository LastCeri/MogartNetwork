// ProfileMainContent.tsx
import React, { useState } from 'react';
import { UserData, PostType } from '../../../Profile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSliders, faThumbsUp, faComment, faShareNodes, faUserSlash, faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import ReactPlayer from 'react-player';
import { useData } from '../../../../../MogartBase/Context/DataContext';
import { PostSendComment, PostSendDislike, PostSendLike } from '../../../../../MogartBase/Api/Api';
import SharePopup from '../../../../../MogartBase/ThemeParts/Popup/SharePopup';

interface ProfileMainContentProps {
  userData: UserData | null;
}

const ProfileMainContent: React.FC<ProfileMainContentProps> = ({ userData }) => {
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [play, setPlay] = useState(false);
  const { siteData, data } = useData();
  const [commentText, setCommentText] = useState(""); 


  const SendLike = async (globalId: string) => { await PostSendLike({UserID:data.UserName, ContentID:globalId, ContentType:"PostContent"}); };
  const SendDisLike = async (globalId: string) => {  await PostSendDislike({UserID:data.UserName, ContentID:globalId, ContentType:"PostContent"}); };
  const SendComment = async (globalId: string, commentcontent: string) => {await PostSendComment({UserID:data.UserName, ContentID:globalId, Content:commentcontent, ContentType:"PostContent"}); };

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(event.target.value);
  };

  const handleShareClick = () => {
    setShowSharePopup(true);
  };

  const handleClosePopup = () => {
    setShowSharePopup(false);
  };
  const startVideo = () => {
    setPlay(true);
  };

  const handleShare = () => {
    console.log("Share button pressed.");
  };

  if (!userData) {
    return (
      <main className="flex-1 p-6 overflow-hidden flex items-center justify-center bg-gray-50">
      <div className="text-center p-4 max-w-sm mx-auto bg-white rounded-lg border border-gray-200 shadow-lg">
        <FontAwesomeIcon icon={faUserSlash} className="text-gray-400 h-16 w-16 mx-auto mt-2" />
        <p className="mt-4 text-lg font-semibold text-gray-800">No user data available.</p>
        <p className="text-gray-500">Please check back later or try refreshing the page.</p>
      </div>
    </main>
    );
  }

  if (!userData.Posts) {
    return (
      <main className="flex-1 p-6 overflow-hidden flex items-center justify-center bg-gray-50">
        <div className="text-center p-4 max-w-sm mx-auto bg-white rounded-lg border border-gray-200 shadow-lg">
          <FontAwesomeIcon icon={faFolderOpen} className="text-gray-400 h-16 w-16 mx-auto mt-2" />
          <p className="mt-4 text-lg font-semibold text-gray-800">No user posts available.</p>
          <p className="text-gray-500">Start sharing your moments or try again later.</p>
        </div>
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

            {post.ImageUrl && !post.VideoUrl && (
              <img src={post.ImageUrl} alt="Post" className="mb-3 max-w-full h-auto rounded-lg shadow" />
            )}

            {post.VideoUrl && (
                <div className="flex justify-center items-center bg-black">
                <div className="video-player-container bg-gray-800 rounded-lg overflow-hidden shadow-lg max-w-xl w-full">
                  <ReactPlayer
                    url={post.VideoUrl}
                    playing={play}
                    controls={true}
                    onStart={startVideo}
                    width="100%"
                    height="100%"
                    className="react-player rounded-lg"
                  />
                  <div className="p-4">
                    <h2 className="text-xl font-semibold text-white">{post.Author}</h2>
                    <p className="text-gray-400">{post.Content}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="border-t pt-3 mt-3 text-sm flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button type="button" onClick={() => SendLike(post.GlobalId)} className="flex items-center text-gray-600 hover:text-blue-700 transition-colors duration-200 ease-in-out">
                  <FontAwesomeIcon icon={faThumbsUp} className="text-xl mr-2" /> 
                  <span className="font-medium">{post.LikeCount} Like</span>
                </button>
                <button type="button" onClick={() => setShowCommentInput(!showCommentInput)} className="flex items-center text-gray-600 hover:text-green-700 transition-colors duration-200 ease-in-out">
                  <FontAwesomeIcon icon={faComment} className="text-xl mr-2" />
                  <span className="font-medium">{post.CommentCount} Comment</span>
                </button>
              </div>
              <button type="button" onClick={handleShareClick} className="flex items-center text-gray-600 hover:text-red-700 transition-colors duration-200 ease-in-out">
                <FontAwesomeIcon icon={faShareNodes} className="text-xl mr-2" /> 
                <span className="font-medium">Share</span>
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
             {showSharePopup && <SharePopup url={`https://mogart-network.vercel.app/posts/${post.GlobalId}`} title={post.Author} onClose={handleClosePopup} />}
          </div>
          
        ))
      )}
    </main>
  );
};

export default ProfileMainContent;
