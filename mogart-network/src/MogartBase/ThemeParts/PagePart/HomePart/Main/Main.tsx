import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { createPost, API_URL } from '../../../../Api/Api';
import { useData } from '../../../../Context/DataContext';
import axios from 'axios';
import Posts, { PostProps } from './components/Posts';

function MainContent() {
  const { isLoggedIn, data, isLoading, siteData, userAuthID, userAuthToken } = useData();
  const [postContent, setPostContent] = useState('');
  const [posts, setPosts] = useState<PostProps[]>([]);

  const handlePostButtonClick = async () => {
    if (postContent.trim() !== '') {
        try {
            const response = await createPost({ UserID: userAuthID, UserToken: userAuthToken, Content: postContent},userAuthToken);
            if (response && response.status === "Ok") {
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
  if (isLoading) return;

  const fetchPosts = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/GetMogartPosts`);
      const mappedPosts: PostProps[] = data.map((post: any) => ({
        GlobalId: post.Pstid,
        Author: post.PstAuthor,
        Avatar: post.PstAuthorAvatar,
        Content: post.PstContent,
        VideoUrl: post.PstVideos,
        ImageUrl: post.PstImages,
        CommentCount: post.PstCommentCount,
        Date: post.PstDate,
        DisLike: post.PstDisLike,
        Mentions: post.PstMentions,
        Name: post.PstName,
        Points: post.PstPoints,
        PostCode: post.PstPostCode,
        Space: post.PstSpace,
        Title: post.PstTitle,
        VideoTitle: post.PstTitle,
        VideoDesc: post.PstContent,
        Views: post.PstViews,
        Likes: typeof post.PstLike === 'string' ? JSON.parse(post.PstLike) : post.PstLike,
        Comments: typeof post.PstComments === 'string' ? JSON.parse(post.PstComments) : post.PstComments,
      }));
      setPosts(mappedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  fetchPosts();
}, [isLoading]);

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
          <Posts
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
            Likes={post.Likes}
            Comments={post?.Comments}
          />
      ))}
      </div>
    </main>
  );
}
export default MainContent;
