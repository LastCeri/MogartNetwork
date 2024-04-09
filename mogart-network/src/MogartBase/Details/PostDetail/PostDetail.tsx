import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../../ThemeParts/MainPart/Header/HeaderPart';
import Navbar from '../../ThemeParts/MainPart/Navbar/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSliders, faThumbsUp, faComment, faShareNodes, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { API_URL } from '../../Api/Api';
import RightSidebar from '../../ThemeParts/PagePart/HomePart/RightSidebar/RightSidebar';
import LeftSidebar from '../../ThemeParts/PagePart/HomePart/LeftSidebar/LeftSidebar';
import { useData } from '../../Context/DataContext';

interface Post {
  PstTitle: string;
  PstAuthor: string;
  PstViews: string;
  PstContent: string;
  PstAuthorAvatar: string;
  PstDate: string;
  PstComments: PostComments[];
}

export interface PostComments {
  comment_id: number;
  author: string;
  content: string;
  profile_image:string;
  comment_date:string;
}

const PostDetail = () => {
  const { posturl } = useParams<{ posturl: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [comments, setComments] = useState<PostComments[]>([]);
  const [commentText, setCommentText] = useState('');
  const { siteData, data } = useData();

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<Post>(`${API_URL}/GetPosts/${posturl}`);
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

              <div className="px-5 py-4 flex justify-between items-center text-gray-500">
                <button className="flex items-center space-x-1 hover:text-blue-600">
                  <FontAwesomeIcon icon={faThumbsUp} /><span>Like</span>
                </button>
                <button className="flex items-center space-x-1 hover:text-green-600">
                  <FontAwesomeIcon icon={faComment} /><span>Comment</span>
                </button>
                <button className="flex items-center space-x-1 hover:text-red-600">
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
                  ></textarea>
                  <button className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-200">Add Comment</button>
                </div>
              )}

              <div className="space-y-4 p-5">
                {comments.map((comment) => (
                  <div key={comment.comment_id} className="bg-gray-50 rounded-xl p-4 shadow transition-shadow duration-300 ease-in-out hover:shadow-lg">
                    <div className="flex items-start space-x-3">
                      <img src={comment.profile_image} alt="User Avatar" className="w-10 h-10 rounded-full object-cover shadow-sm" />
                      <div className="flex-1">
                        <h5 className="font-semibold text-gray-900">{comment.author}</h5>
                        <p className="text-sm text-gray-600 mt-1">{comment.content}</p>
                        <p className="text-sm text-gray-600 mt-1">{comment.comment_date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

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
