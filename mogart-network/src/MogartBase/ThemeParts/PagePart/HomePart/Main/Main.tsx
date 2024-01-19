import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane} from '@fortawesome/free-solid-svg-icons';
import { useFetchMogartPosts } from '../../../../Api/Api';


interface PostType {
  id: string;
  author: {
    name: string;
    avatar: string; 
  };
  content: string;
  timestamp: string;
}

function Post({ author, content, timestamp }: PostType) {

  if (!author) {
    console.error('Author data is not available');
    return null;
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <div className="flex items-center mb-2">
        <img className="h-10 w-10 rounded-full" src={author.avatar || 'default-avatar-url'} alt={`${author.name}'s Avatar`} />
        <span className="text-sm font-medium ml-2">{author.name}</span>
      </div>
      <p className="text-sm mb-2">{content}</p>
      <div className="text-gray-500 text-sm">{timestamp}</div>
    </div>
  );
}
function MainContent() {

  const [postContent, setPostContent] = useState('');
  const postsFromApi = useFetchMogartPosts();
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    setPosts(postsFromApi);
  }, [postsFromApi]);
  
  return (
    <main className="w-1/2 sm:w-3/6 top-20 mr-16" style={{ marginRight: '20px' }}> 
   <div className="bg-white p-4 rounded-lg shadow mb-4 flex items-center space-x-4">
        <img className="h-10 w-10 rounded-full" src="your-avatar-url" alt="User Avatar" />
        <input
          className="form-input p-2 w-3/4 border rounded-md"
          type="text"
          placeholder="What's on your mind?"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
        />
        <button
          className="h-8 w-20 bg-blue-500 rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          <FontAwesomeIcon icon={faPaperPlane} className="h-5 w-5" />
        </button>
      </div>
      
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
            key={post.id}
            id={post.id}
            author={post.author}
            content={post.content}
            timestamp={post.timestamp}
          />
        ))}
      </div>
    </main>
  );
}
export default MainContent;
