import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane,faThumbsUp,faShareNodes,faComment,faSliders } from '@fortawesome/free-solid-svg-icons';
import { useFetchMogartPosts, createPost } from '../../../../Api/Api';
import { useData } from '../../../../Context/DataContext';

interface PostType {
  GlobalId: string;
  Author: string;
  Avatar: string;
  Content: string;
  Date: string;
}

function Post({ Author, Avatar,GlobalId, Content: PostContent, Date: PostDate }: PostType): React.JSX.Element {
  const [showCommentInput, setShowCommentInput] = useState(false);
  const {siteData} = useData();
  const handleLike = () => {
  };

  const handleComment = () => {
    setShowCommentInput(!showCommentInput);
  };

  const handleShare = () => {
  };

  return (
    <div className="bg-white rounded-lg shadow-lg mb-8 p-4 text-gray-700">  
      <div className="flex items-center justify-between mb-3">
      <Link to={`/posts/${GlobalId}`} key={GlobalId} style={{ textDecoration: 'none' }}>
        <div className="flex items-center">
          <img className="h-8 w-8 rounded-full mr-2 object-cover" src={Avatar || siteData?.SiteDefaultProfileImageURL} alt={`${Author}'s avatar`} />
          <div>
            <div className="font-medium">{Author}</div>
            <div className="text-xs text-gray-500">{PostDate}</div>
          </div>
        </div>
        </Link>
        <div className="text-gray-500 hover:text-gray-700 cursor-pointer">
          <FontAwesomeIcon icon={faSliders} />
        </div>   
       
      </div>
      
      <p className="mb-3">{PostContent}</p>
      
      <div className="border-t pt-3 mt-3 text-sm flex p-2 justify-start items-center">
        <button type="button" onClick={handleLike} className="text-gray-500 hover:text-blue-600 focus:outline-none mr-2">
          <FontAwesomeIcon icon={faThumbsUp} className="mr-1" /> Like
        </button>
        <Link to={`/posts/${GlobalId}`} key={GlobalId} style={{ textDecoration: 'none' }}>
          <button type="button" onClick={handleComment} className="text-gray-500 hover:text-green-600 focus:outline-none mx-2">
            <FontAwesomeIcon icon={faComment} className="mr-1" /> Comment
          </button>
        </Link>
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
      {posts.map((post) => (
          <Post
            GlobalId={post.GlobalId}
            Author={post.Author}
            Avatar={post.Avatar}
            Content={post.Content}
            Date={post.Date}
          />
      ))}
      </div>
    </main>
  );
}
export default MainContent;
