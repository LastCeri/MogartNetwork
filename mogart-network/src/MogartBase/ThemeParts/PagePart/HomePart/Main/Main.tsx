import React, { useState, useEffect } from 'react';
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

function Post({ Author, Avatar, Content: PostContent, Date: PostDate }: PostType): React.JSX.Element {
  const [showCommentInput, setShowCommentInput] = useState(false);

  const handleLike = () => {
    console.log("Like button pressed.");
  };

  const handleComment = () => {
    setShowCommentInput(!showCommentInput);
  };

  const handleShare = () => {
    console.log("Share button pressed.");
  };

  return (
    <div className="bg-white rounded-lg shadow-lg mb-8 p-4 text-gray-700">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <img className="h-8 w-8 rounded-full mr-2" src={Avatar || 'default-avatar-url'} alt={`${Author}'s avatar`} />
          <div>
            <div className="font-medium">{Author}</div>
            <div className="text-xs text-gray-500">{PostDate}</div>
          </div>
        </div>

        <div className="text-gray-500 hover:text-gray-700 cursor-pointer">
          <FontAwesomeIcon icon={faSliders} />
        </div>
      </div>
      
      <p className="mb-3">{PostContent}</p>
      
      <div className="border-t pt-3 mt-3 text-sm flex p-2 justify-start items-center">
        <button type="button" onClick={handleLike} className="text-gray-500 hover:text-blue-600 focus:outline-none mr-2">
          <FontAwesomeIcon icon={faThumbsUp} className="mr-1" /> Like
        </button>
        <button type="button" onClick={handleComment} className="text-gray-500 hover:text-green-600 focus:outline-none mx-2">
          <FontAwesomeIcon icon={faComment} className="mr-1" /> Comment
        </button>
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
  const { isLoggedIn, data, isLoading } = useData();
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
                // Additional actions after successful post creation can be added here
                // For example, you can update the user interface
            } else {
                // We couldn't get the expected response from the API, show an error message to the user
                console.error('Post creation failed, please try again later.');
            }
        } catch (error) {
            // An error occurred during the API call, log the error message
            console.error('Error while posting:', error);
            // Additional actions in case of an error can be added here
            // For example, you can display an error message
        }

        // Whether the post operation is successful or not, clear the post content
        setPostContent('');
    } else {
        // If postContent is empty, you can show a warning to the user
        console.warn('Post content cannot be empty.');
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
