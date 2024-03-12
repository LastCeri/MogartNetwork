import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../../ThemeParts/MainPart/Header/HeaderPart';
import Navbar from '../../ThemeParts/MainPart/Navbar/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSliders, faThumbsUp, faComment, faShareNodes } from '@fortawesome/free-solid-svg-icons';
import { API_URL } from '../../Api/Api';

interface Post {
  Post_Title: string;
  Post_Author: string;
  Post_Image: string;
  Post_Content: string;
  Avatar?: string;
  Post_Date?: string;
}

interface Comment {
  id: number;
  author: string;
  content: string;
}

const PostDetail = () => {
  const { posturl } = useParams<{ posturl: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<Post>(`${API_URL}/GetPosts/${posturl}`);
        setPost(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Post fetch error:', error);
        setError('Failed to fetch post');
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [posturl]);

  const handleAddComment = () => {
    if (commentText.trim() !== '') {
      const newComment = {
        id: Date.now(), 
        author: 'Current User',
        content: commentText,
      };
      setComments([...comments, newComment]);
      setCommentText(''); 
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!post) return <div>No post found</div>;

  return (
    <>
      <Header />
      <Navbar />
      <div className="flex flex-col min-h-screen justify-center items-center">
       
        <div className="bg-white rounded-lg shadow-lg mb-8 p-4 text-gray-700 max-w-lg w-full h-auto">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <img className="h-8 w-8 rounded-full mr-2" src={post.Avatar || 'default-avatar-url'} alt={`${post.Post_Author}'s avatar`} />
              <div>
                <div className="font-medium">{post.Post_Author}</div>
                <div className="text-xs text-gray-500">{post.Post_Date}</div>
              </div>
            </div>
            <div className="text-gray-500 hover:text-gray-700 cursor-pointer">
              <FontAwesomeIcon icon={faSliders} />
            </div>
          </div>
          
          <p className="mb-3">{post.Post_Content}</p>
          
          <div className="border-t pt-3 mt-3 text-sm flex justify-between items-center">
            <button onClick={() => setShowCommentInput(!showCommentInput)} className="text-gray-500 hover:text-blue-600 focus:outline-none">
              <FontAwesomeIcon icon={faThumbsUp} /> Like
            </button>
            <button onClick={() => setShowCommentInput(!showCommentInput)} className="text-gray-500 hover:text-green-600 focus:outline-none">
              <FontAwesomeIcon icon={faComment} /> Comment
            </button>
            <button onClick={() => console.log('Share')} className="text-gray-500 hover:text-red-600 focus:outline-none">
              <FontAwesomeIcon icon={faShareNodes} /> Share
            </button>
          </div>

          {showCommentInput && (
            <div className="pt-2">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Type a comment..."
                className="w-full p-2 text-sm text-gray-500 rounded-lg border focus:outline-none focus:border-blue-500"
                autoFocus
                rows={3}
              ></textarea>
              <button onClick={handleAddComment} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none">
                Add Comment
              </button>
            </div>
          )}

          <div className="mt-4">
            {comments.map((comment) => (
              <div key={comment.id} className="bg-gray-100 rounded p-2 my-2">
                <div className="font-semibold">{comment.author}</div>
                <p>{comment.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PostDetail;
