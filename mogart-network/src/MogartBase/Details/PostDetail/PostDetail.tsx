import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../../ThemeParts/MainPart/Header/HeaderPart';
import Navbar from '../../ThemeParts/MainPart/Navbar/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSliders, faThumbsUp, faComment, faShareNodes } from '@fortawesome/free-solid-svg-icons';
import { API_URL } from '../../Api/Api';

interface Post {
  PstTitle: string;
  PstAuthor: string;
  PstViews: string;
  PstContent: string;
  PstAuthorAvatar: string;
  PstDate: string;
  PstComments: Comment[];
}

interface Comment {
  comment_id: number;
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
        console.log("res",response);
        setPost(response.data);

        if (response.data.PstComments === null) {
          response.data.PstComments = [];
        }

        setComments(response.data.PstComments);
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
        comment_id: Date.now(), 
        author: 'Current User',
        content: commentText,
      };
      setComments([...comments, newComment]);
      setCommentText(''); 
    }
  };

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
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
    
    <div className="w-full max-w-lg p-4 bg-white rounded-lg shadow-md mt-20 text-gray-900">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <img className="h-10 w-10 rounded-full mr-3" src={post.PstAuthorAvatar || 'default-avatar-url'} alt={`${post.PstAuthor}'s avatar`} />
          <div>
            <div className="font-semibold">{post.PstAuthor}</div>
            <div className="text-xs text-gray-400">{post.PstDate}</div>
          </div>
        </div>
        <div className="p-2 rounded-full text-gray-400 hover:text-gray-500 cursor-pointer">
          <FontAwesomeIcon icon={faSliders} size="lg" />
        </div>
      </div>
      
      <p className="mb-4">{post.PstContent}</p>
      
      <div className="border-t pt-4 mt-4 text-xs flex justify-between items-center">
        <button className="flex items-center text-gray-400 hover:text-blue-500 focus:outline-none">
          <FontAwesomeIcon icon={faThumbsUp} className="mr-1" /> Like
        </button>
        <button className="flex items-center text-gray-400 hover:text-green-500 focus:outline-none">
          <FontAwesomeIcon icon={faComment} className="mr-1" /> Comment
        </button>
        <button className="flex items-center text-gray-400 hover:text-red-500 focus:outline-none">
          <FontAwesomeIcon icon={faShareNodes} className="mr-1" /> Share
        </button>
      </div>

      {showCommentInput && (
        <div className="mt-4">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Type a comment..."
            className="w-full p-3 text-sm text-gray-900 bg-gray-100 rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            autoFocus
            rows={3}
          ></textarea>
          <button className="mt-3 w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow">
            Add Comment
          </button>
        </div>
      )}

      <div className="mt-4 space-y-2">
        {comments.map((comment) => (
          <div key={comment.comment_id} className="bg-gray-100 rounded-lg p-3">
            <div className="font-semibold">{comment.author}</div>
            <p className="text-sm text-gray-800">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
    
  </div>
</>

  );
};

export default PostDetail;
