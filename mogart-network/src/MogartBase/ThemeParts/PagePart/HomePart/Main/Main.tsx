import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane,faThumbsUp,faShareNodes,faComment,faSliders } from '@fortawesome/free-solid-svg-icons';
import { useFetchMogartPosts, createPost, PostSendLike, PostSendDislike, PostSendComment } from '../../../../Api/Api';
import { useData } from '../../../../Context/DataContext';
import ReactPlayer from 'react-player'
import SharePopup from '../../../Popup/SharePopup';

interface PostType {
  Author: string;
  Avatar: string;
  GlobalId: string;
  Content: string; 
  Date: string;
  CommentCount:string;
  LikeCount:string;
  VideoTitle?: string;
  VideoDesc?: string;
  ImageUrl?: string;
  VideoUrl?: [];
}

function Post({ Author, Avatar, GlobalId, Content: PostContent, Date: PostDate, VideoTitle, VideoDesc,ImageUrl,VideoUrl,CommentCount,LikeCount }: PostType): React.JSX.Element {
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [play, setPlay] = useState(false);
  const { siteData, data } = useData();
  const [commentText, setCommentText] = useState(""); 


  const startVideo = () => {
    setPlay(true);
  };

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

  return (
    
    <div className="bg-white rounded-lg shadow-lg mb-8 p-4 text-gray-700 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between mb-3">
        <Link to={`/posts/${GlobalId}`}>  
        <div className="flex items-center no-underline text-gray-700">
          <img className="h-8 w-8 rounded-full mr-2 object-cover" src={Avatar || siteData?.SiteDefaultProfileImageURL} alt={`${Author}'s avatar`} />
            <div>
              <div className="font-medium">{Author}</div>
              <div className="text-xs text-gray-500">{PostDate}</div>
            </div>
        </div>
        </Link>
        <FontAwesomeIcon icon={faSliders} className="text-gray-500 hover:text-gray-700 cursor-pointer" />
      </div>
     
      <p className="mb-3">{PostContent}</p>

      {ImageUrl && !VideoUrl && (
        <img src={ImageUrl} alt="Post" className="mb-3 max-w-full h-auto rounded-lg shadow" />
      )}
      
      {VideoUrl && !ImageUrl &&(
        <div className="flex justify-center items-center bg-black">
        <div className="video-player-container bg-gray-800 rounded-lg overflow-hidden shadow-lg max-w-xl w-full">
          <ReactPlayer
            url={VideoUrl}
            playing={play}
            controls={true}
            onStart={startVideo}
            width="100%"
            height="100%"
            className="react-player rounded-lg"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold text-white">{VideoTitle}</h2>
            <p className="text-gray-400">{VideoDesc}</p>
          </div>
        </div>
      </div>
      )}

      <div className="border-t pt-3 mt-3 text-sm flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button type="button" onClick={() => SendLike(GlobalId)} className="flex items-center text-gray-600 hover:text-blue-700 transition-colors duration-200 ease-in-out">
            <FontAwesomeIcon icon={faThumbsUp} className="text-xl mr-2" /> 
            <span className="font-medium">{LikeCount} Like</span>
          </button>
          <button type="button" onClick={() => setShowCommentInput(!showCommentInput)} className="flex items-center text-gray-600 hover:text-green-700 transition-colors duration-200 ease-in-out">
            <FontAwesomeIcon icon={faComment} className="text-xl mr-2" />
            <span className="font-medium">{CommentCount} Comment</span>
          </button>
        </div>
        <button type="button" onClick={handleShareClick} className="flex items-center text-gray-600 hover:text-red-700 transition-colors duration-200 ease-in-out">
          <FontAwesomeIcon icon={faShareNodes} className="text-xl mr-2" /> 
          <span className="font-medium">Share</span>
        </button>
      </div>


      {showCommentInput && (
        <div className="pt-2 flex items-center space-x-2">
          <input
            type="text"
            value={commentText}
            onChange={handleCommentChange} 
            placeholder="Type a comment..."
            className="w-full p-3 text-sm text-gray-500 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-blue-500 transition duration-150 ease-in-out"
            autoFocus
          />
          <button 
            className="p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition duration-150 ease-in-out flex-shrink-0"
            onClick={() => SendComment(GlobalId, commentText)} 
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      )}

      {showSharePopup && <SharePopup url={`https://mogart-network.vercel.app/posts/${GlobalId}`} title={Author} onClose={handleClosePopup} />}
    </div>
  );
}

function MainContent() {
  const { isLoggedIn, data, isLoading,siteData } = useData();
  const [postContent, setPostContent] = useState('');
  const postsFromApi = useFetchMogartPosts();
  const [posts, setPosts] = useState<PostType[]>([]);

  const handlePostButtonClick = async () => {
    if (postContent.trim() !== '') {
        const newPost = {
            Content: postContent,
        };
        try {
            const response = await createPost(newPost);
            if (response && response.status === "Ok") {
                console.log('Post successfully created!');
            } else {
                console.error('Post creation failed, please try again later.');
            }
        } catch (error) {
            console.error('Error while posting:', error);
        }

        setPostContent('');
    } else {
        console.warn('Post content cannot be empty.');
    }
};

  useEffect(() => {
    if (isLoading) {
      return;
    }
    setPosts(postsFromApi);
  }, [postsFromApi]);
  
  
  return (
    <main className="w-1/2 sm:w-3/6 top-20 mr-16" style={{ marginRight: '20px' }}> 
      {isLoggedIn && (
        <div className="bg-white p-4 rounded-lg shadow-md mt-4 mb-4 flex items-center space-x-4">
        <img className="h-12 w-12 rounded-full object-cover" src={data?.ProfileImage || siteData?.SiteDefaultProfileImageURL} alt="User Avatar" />
        <input
          className="form-input flex-1 py-2 px-4 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition ease-in-out duration-150"
          type="text"
          placeholder="What's on your mind?"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
        />
        <button
          onClick={handlePostButtonClick}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-full flex items-center justify-center text-white transition duration-300 ease-in-out"
        >
          <FontAwesomeIcon icon={faPaperPlane} className="h-5 w-5" />
        </button>
      </div>
      )}
      
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <ul className="flex items-center space-x-6">
          <li className="text-blue-500 cursor-pointer font-semibold hover:text-blue-600 transition duration-150 ease-in-out">Global Members</li>
          <li className="cursor-pointer hover:text-gray-700 transition duration-150 ease-in-out">Local</li>
          <li className="cursor-pointer hover:text-gray-700 transition duration-150 ease-in-out">Latest</li>
          <li className="cursor-pointer hover:text-gray-700 transition duration-150 ease-in-out">Follows</li>
          <li className="cursor-pointer hover:text-gray-700 transition duration-150 ease-in-out">Mentions</li>
        </ul>
      </div>
      <div className="space-y-4">
      {posts.map((post,key) => (
          <Post
            key={key}
            GlobalId={post.GlobalId}
            Author={post.Author}
            Avatar={post.Avatar}
            Content={post.Content}
            Date={post.Date}
            VideoUrl={post.VideoUrl}
            VideoTitle={post.VideoTitle}
            VideoDesc={post.VideoDesc}
            CommentCount={post.CommentCount}
            LikeCount={post.LikeCount}
          />
      ))}
      </div>
    </main>
  );
}
export default MainContent;
