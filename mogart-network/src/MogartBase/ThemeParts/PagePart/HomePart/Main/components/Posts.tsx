import { faComment, faPaperPlane, faShareNodes, faSliders, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import SharePopup from '../../../../Popup/SharePopup';
import ReactPlayer from 'react-player';
import { Link, useNavigate } from 'react-router-dom';
import { PostSendComment, PostSendDislike, PostSendLike } from '../../../../../Api/Api';
import { useData } from '../../../../../Context/DataContext';
import { PostComments } from '../../../../../Details/PostDetail/PostDetail';

export interface PostProps {
    Author: string;
    Avatar: string;
    GlobalId: string;
    Content: string; 
    Date: string;
    CommentCount: string;
    Likes: any[]; 
    VideoTitle?: string;
    VideoDesc?: string;
    ImageUrl?: string;
    VideoUrl?: string[];
    Comments: PostComments[]; 
  }

const Posts = React.memo(({ Author, Avatar, GlobalId, Content, Date, CommentCount, Likes, VideoTitle, VideoDesc, ImageUrl, VideoUrl, Comments }: PostProps): JSX.Element => {
    const [comments, setComments] = useState<PostComments[]>(Comments);
    const [showCommentInput, setShowCommentInput] = useState(false);
    const [showSharePopup, setShowSharePopup] = useState(false);
    const [showActionsPopup, setShowActionsPopup] = useState(false);
    const [play, setPlay] = useState(false);
    const { siteData, data, isLoading,userAuthToken } = useData();
    const [commentText, setCommentText] = useState("");
    const [isLiked, setIsLiked] = useState(false);
    const navigate = useNavigate(); 
  
  
    useEffect(() => {
  
      if (isLoading) return;
    
      if (typeof Comments === 'string') {
        try {
          const parsedComments = JSON.parse(Comments);
          setComments(parsedComments);
        } catch (error) {
          console.error("Failed to parse comments:", error);
          setComments([]);
        }
      } else if (Array.isArray(Comments)) {
        setComments(Comments);
      } else {
        console.error('Unexpected Comments prop type:', typeof Comments);
        setComments([]);
      }
    
      try {
        const userLiked = Likes.some(like => like.userName === data.UserName);
        setIsLiked(userLiked);
      } catch (error) {
        console.error("Failed to update isLiked state:", error);
        setIsLiked(false); 
      }
    
    }, [Comments, Likes, data.UserName, isLoading]); 
    
    
  
    const startVideo = () => {
      setPlay(true);
    };
  
    const SendLike = async (globalId: string) => { await PostSendLike({UserID:data.UserName, ContentID:globalId, ContentType:"PostContent"},userAuthToken); };
    const SendDisLike = async (globalId: string) => {  await PostSendDislike({UserID:data.UserName, ContentID:globalId, ContentType:"PostContent"},userAuthToken);};
    const SendComment = async (globalId: string, commentcontent: string) => {await PostSendComment({UserID:data.UserName, ContentID:globalId, Content:commentcontent, ContentType:"PostContent"},userAuthToken); };
  
    const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setCommentText(event.target.value);
    };
  
    const handleactionClick = () => {
      console.log("Aksiyon geldi");
      if(!showActionsPopup)
        {
          setShowActionsPopup(true);
        }
        else{
          setShowActionsPopup(false);
        }
      
    };
    
    const handleShareClick = () => {
      setShowSharePopup(true);
    };
  
    const handleClosePopup = () => {
      setShowSharePopup(false);
    };
  
    const handleComment = (postid:string) => {
      navigate(`/Posts/${postid}`);
    };
  
    return (
      <div className="bg-white rounded-lg shadow-lg mb-8 p-4 text-gray-700 hover:shadow-xl transition-shadow duration-300">
        <div className="relative">
          <div className="flex items-center justify-between mb-3">
            <Link to={`/posts/${GlobalId}`}>  
              <div className="flex items-center no-underline text-gray-700">
                <img className="h-8 w-8 rounded-full mr-2 object-cover" src={Avatar || siteData?.SiteDefaultProfileImageURL} alt={`${Author}'s avatar`} />
                <div>
                  <div className="font-medium">{Author}</div>
                  <div className="text-xs text-gray-500">{Date}</div>
                </div>
              </div>
            </Link>
            <button 
              type="button" 
              className="flex items-center text-gray-600 hover:text-blue-700 transition-colors duration-200 ease-in-out"
              onClick={handleactionClick}
            >
              <FontAwesomeIcon icon={faSliders} className="text-gray-500 hover:text-gray-700 cursor-pointer" />
            </button>
          </div>

          {showActionsPopup && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
              <button
                onClick={() => {
                  console.log("Gönderi kaydedildi");
                }}
                className="block w-full py-2 px-4 text-left text-gray-800 hover:bg-gray-200"
              >
                Kaydet
              </button>
              <button
                onClick={() => {
                  console.log("Gönderiye şikayet edildi");
                }}
                className="block w-full py-2 px-4 text-left text-gray-800 hover:bg-gray-200"
              >
                Şikayet Et
              </button>
            </div>
          )}
        </div>

        <p className="mb-3">{Content}</p>
  
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
            <button type="button" onClick={() => SendLike(GlobalId)} 
              className="flex items-center text-gray-600 hover:text-blue-700 transition-colors duration-200 ease-in-out"
            >
              <FontAwesomeIcon 
                icon={faThumbsUp} 
                className={`${isLiked ? 'text-blue-600' : 'text-gray-500'} text-xl mr-2 hover:text-blue-700`} 
              />
              <span className="font-medium">{Likes.length > 0 ? `${Likes.length} ` : ''}Like{Likes.length === 1 ? '' : 's'}</span>
            </button>
            <button type="button" onClick={() => handleComment(GlobalId)} className="flex items-center text-gray-600 hover:text-green-700 transition-colors duration-200 ease-in-out">
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
              <div className="mt-6 flex items-center space-x-2">
                <input
                  type="text"
                  value={commentText}
                  onChange={handleCommentChange}
                  placeholder="Type a comment..."
                  className="flex-grow px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
                  autoFocus
                />
                <button
                  className="inline-flex justify-center items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition duration-150 ease-in-out flex-shrink-0"
                  onClick={() => SendComment(GlobalId, commentText)}
                >
                  <FontAwesomeIcon icon={faPaperPlane} className="text-lg"/>
                </button>
              </div>
            )}


        {showSharePopup && <SharePopup url={`https://mogart-network.vercel.app/posts/${GlobalId}`} title={Author} onClose={handleClosePopup} />}
      </div>
    );
  });


  export default Posts;

