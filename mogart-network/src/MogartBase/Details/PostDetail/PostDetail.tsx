import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../../ThemeParts/MainPart/Header/HeaderPart';
import Navbar from '../../ThemeParts/MainPart/Navbar/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSliders, faThumbsUp, faComment, faShareNodes, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { API_URL, PostSendComment, PostSendLike } from '../../Api/Api';
import RightSidebar from '../../ThemeParts/PagePart/HomePart/RightSidebar/RightSidebar';
import LeftSidebar from '../../ThemeParts/PagePart/HomePart/LeftSidebar/LeftSidebar';
import { useData } from '../../Context/DataContext';
import SharePopup from '../../ThemeParts/Popup/SharePopup';

interface Post {
  Pstid:string
  PstTitle: string;
  PstAuthor: string;
  PstViews: string;
  PstContent: string;
  PstAuthorAvatar: string;
  PstDate: string;
  PstLike:Likes[];
  PstComments: PostComments[];
}
export interface Likes {
  userName: string;
  userprofileimage: string;
  likeDate: string;
}

export interface PostComments {
  comment_id: number;
  author: string;
  content: string;
  profile_image:string;
  comment_date:string;
  likes:string;
  replies:string;
}

const PostDetail = () => {
  const { posturl } = useParams<{ posturl: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [comments, setComments] = useState<PostComments[]>([]);
  const [commentText, setCommentText] = useState('');
  const {data } = useData();
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [isLiked, setIsLiked] = useState(false);


  const SendComment = async (globalId: string, commentcontent: string) => { const response = await PostSendComment({UserID:data.UserName, ContentID:globalId, Content:commentcontent, ContentType:"PostContent"});};
  const SendLike = async (globalId: string) => {
    const response = await PostSendLike({ UserID: data.UserName, ContentID: globalId, ContentType: "PostContent" });
    if (response.status === 'Ok') {
      setIsLiked(true);
    } else {
      console.error("Failed to like post");
    }
  };
  
  
  const handleClosePopup = () => {
    setShowSharePopup(false);
  };

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<Post>(`${API_URL}/GetPosts/${posturl}`);
        const postData = response.data;
  
        let likesArray = postData.PstLike;
        if (typeof postData.PstLike === 'string') {
          likesArray = JSON.parse(postData.PstLike);
        }
  
        if (!Array.isArray(likesArray)) {
          likesArray = [];
        }
  
        const userLiked = likesArray.some(like => like.userName === data.UserName);
        setIsLiked(userLiked);
  
        setPost({...postData, PstLike: likesArray}); 
        setComments(postData.PstComments || []);
        setIsLoading(false);
      } catch (error) {
        console.error('Post fetch error:', error);
        setError('Failed to fetch post');
        setIsLoading(false);
      }
    };
  
    fetchPost();
  }, [posturl, data.UserName]);

  if (isLoading) return  <div className="flex justify-center items-center h-screen">
  <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
  <p className="text-lg text-purple-600 font-semibold ml-4">Loading...</p>
</div>;
  if (error) return <div>Error: {error}</div>;
  if (!post) return <div>No post found</div>;

  return (
    <>
  <Header />
  <Navbar />
  <div className="w-full flex flex-1 pl-16 mt-20">
    <LeftSidebar/>
    <main className="flex-grow">
      <div className="max-w-xl mx-auto p-4">
        {isLoading ? (
          <div className="flex justify-center items-center space-x-2">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
            <p className="text-lg text-blue-600 font-semibold">Loading...</p>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : (
          post && (
            <article className="bg-white w-full rounded-lg shadow overflow-hidden">
              <div className="p-5 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                 
                  <img className="h-12 w-12 rounded-full object-cover" src={post.PstAuthorAvatar || 'default-avatar-url.jpg'} alt={`${post.PstAuthor}'s avatar`} />
                  <Link to={`/Profile/${post.PstAuthor}`}> 
                  <div>
                    <h4 className="font-bold text-lg">{post.PstAuthor}</h4>
                    <p className="text-sm text-gray-500">{post.PstDate}</p>
                  </div>
                  </Link>
                </div>
                <p className="mt-4 text-gray-800">{post.PstContent}</p>
              </div>

              <div className="bg-slate-50 px-5 py-4 flex justify-end items-center space-x-4 text-gray-500">
              <button onClick={() => SendLike(post.Pstid)}
                className={`flex items-center space-x-1 hover:text-blue-600 ${isLiked ? 'text-blue-600' : 'text-gray-500'}`}>
                <FontAwesomeIcon icon={faThumbsUp} className={isLiked ? 'text-blue-600' : 'text-gray-500'} />
                <span className={isLiked ? 'text-blue-600' : 'text-gray-500'}>{post.PstLike.length}</span>
              </button>

              <button onClick={() => setShowCommentInput(true)} className="flex items-center space-x-1 hover:text-green-600">
                <FontAwesomeIcon icon={faComment} /><span>Comment</span>
              </button>
              <button onClick={() => setShowSharePopup(true)} className="flex items-center space-x-1 hover:text-red-600">
                <FontAwesomeIcon icon={faShareNodes} /><span>Share</span>
              </button>
            </div>

              {showCommentInput && (
                <div className="p-5 border-t border-gray-200">
                  <textarea
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                    placeholder="Type a comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    rows={3}
                    maxLength={120}
                    minLength={10}
                    required
                  ></textarea>
                  <button  onClick={() => SendComment(post.Pstid, commentText)} className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-200">Send Comment</button>
                </div>
              )}

              <div className="space-y-4 p-5">
                {comments.map((comment) => (
                  <div key={comment.comment_id} className="bg-gray-50 rounded-xl p-4 shadow transition-shadow duration-300 ease-in-out hover:shadow-lg">
                    <div className="flex items-start space-x-3">
                      <a href={`/Profile/${comment.author}`}>
                      <img src={comment.profile_image} alt="User Avatar" className="w-10 h-10 rounded-full object-cover shadow-sm" />
                      </a>
                      <div className="flex-1">
                        <h5 className="font-semibold text-gray-900">{comment.author}</h5>
                        <p className="text-sm text-gray-600 mt-1">{comment.content}</p>
                        <p className="text-sm text-gray-600 mt-1">{comment.comment_date}</p>
                      </div>
                    
                      <div className="flex items-center mt-2 space-x-2 text-xs text-gray-500">
                        <button className="flex items-center space-x-1 hover:text-blue-500">
                          <FontAwesomeIcon icon={faThumbsUp} className="h-4 w-4"/>
                          <span>{comment.likes || 0}</span>
                        </button>
                        <button className="flex items-center space-x-1 hover:text-green-500">
                          <FontAwesomeIcon icon={faComment} className="h-4 w-4"/>
                          <span>{comment.replies || 0}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {showSharePopup && <SharePopup url={`https://mogart-network.vercel.app/posts/${post.Pstid}`} title={post.PstAuthor} onClose={handleClosePopup} />}
            </article>
          )
        )}
         
      </div>
    </main>
    <RightSidebar />
  </div>
</>
  );
};

export default PostDetail;
