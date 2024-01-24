import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { useFetchMogartPosts, UserCreatePost } from '../../../../Api/Api';
import { useData } from '../../../../Context/DataContext';

interface PostType {
  GlobalId: string;
  Author: string;
  Avatar: string;
  Content: string;
  Date: string;
}

function Post({ Author, Avatar,Content: PstContent, Date: PstDate }: PostType): React.JSX.Element {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <div className="flex items-center mb-2">
        <img className="h-10 w-10 rounded-full" src={Avatar || 'default-avatar-url'} alt={`${Author}'s Avatar`} />
        <span className="text-sm font-medium ml-2">{Author}</span>
      </div>
      <p className="text-sm mb-2">{PstContent}</p>
      <div className="text-gray-500 text-sm">{PstDate}</div>
    </div>
  );
}

function MainContent() {
  const { isLoggedIn, data, isLoading } = useData();
  const [postContent, setPostContent] = useState('');
  const postsFromApi = useFetchMogartPosts();
  const [posts, setPosts] = useState<PostType[]>([]);

  const handlePostButtonClick = async () => {
    if (postContent.trim() !== '') {
      const newPost: PostType = {
        Content: postContent,
        Author: 'User Name',
        Avatar: 'your-avatar-url',
        Date: new Date().toISOString(),
        GlobalId: `post-${Date.now()}`, 
      };      
  
      try {
        const response = await UserCreatePost(newPost);
        if (response && response.status === "Ok") {
          setPosts([...posts, newPost]); 
        } else {     

        }
      } catch (error) {
        console.error('Error while posting:', error);
      }
      
      setPostContent('');
    }
  };
  
  
  useEffect(() => {
    setPosts(postsFromApi);
  }, [postsFromApi]);
  
  
  return (
    <main className="w-1/2 sm:w-3/6 top-20 mr-16" style={{ marginRight: '20px' }}> 
      {isLoggedIn && (
        <div className="bg-white p-4 rounded-lg shadow mb-4 flex items-center space-x-4">
          <img className="h-10 w-10 rounded-full" src={data.ProfileImage} alt="User Avatar" />
          <input
            className="form-input p-2 w-3/4 border rounded-md"
            type="text"
            placeholder="What's on your mind?"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
          />
          <button
            onClick={handlePostButtonClick}
            className="h-8 w-20 bg-blue-500 rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            <FontAwesomeIcon icon={faPaperPlane} className="h-5 w-5" />
          </button>
        </div>
      )}
      
      <div className="bg-white p-4 rounded-lg shadow mb-4">
        <ul className="flex items-center space-x-4">
          <li className="text-blue-500 cursor-pointer">All Members</li>
          <li className="cursor-pointer">My Groups</li>
          <li className="cursor-pointer">My Favorites</li>
          <li className="cursor-pointer">Mentions</li>
        </ul>
      </div>
      <div className="space-y-4">
        {posts.map((post) => (
          <Post
            key={post.GlobalId}
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
