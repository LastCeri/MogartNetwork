import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

function Post({ author, content, timestamp }) {
    return (
      <div className="bg-white p-4 rounded-lg shadow mb-4">
        <div className="flex items-center mb-2">
          <img className="h-10 w-10 rounded-full" src={author.avatar} alt={`${author.name}'s Avatar`} />
          <span className="text-sm font-medium ml-2">{author.name}</span>
        </div>
        <p className="text-sm mb-2">{content}</p>
        <div className="text-gray-500 text-sm">{timestamp}</div>
      </div>
    );
  }

function MainContent() {

    const posts = [
        {
          id: 1,
          author: { name: 'John Doe', avatar: 'https://cdn.discordapp.com/attachments/1178319248012095509/1178328436557754430/Profile-2.png?ex=658833df&is=6575bedf&hm=2c773dd7496f21049256bf677a9a71a7ca0d8deb20a4eb3a818750040c409f59&' },
          content: 'This is the first post.',
          timestamp: '2 hours ago',
        },
        {
          id: 2,
          author: { name: 'Jane Smith', avatar: 'https://cdn.discordapp.com/attachments/1178319248012095509/1178328436557754430/Profile-2.png?ex=658833df&is=6575bedf&hm=2c773dd7496f21049256bf677a9a71a7ca0d8deb20a4eb3a818750040c409f59&' },
          content: 'Here is another post.',
          timestamp: '1 hour ago',
        },
        {
            id: 3,
            author: { name: 'Jane Smith', avatar: 'https://cdn.discordapp.com/attachments/1178319248012095509/1178328436557754430/Profile-2.png?ex=658833df&is=6575bedf&hm=2c773dd7496f21049256bf677a9a71a7ca0d8deb20a4eb3a818750040c409f59&' },
            content: 'Here is another post.',
            timestamp: '1 hour ago',
          },
          {
            id: 4,
            author: { name: 'Jane Smith', avatar: 'https://cdn.discordapp.com/attachments/1178319248012095509/1178328436557754430/Profile-2.png?ex=658833df&is=6575bedf&hm=2c773dd7496f21049256bf677a9a71a7ca0d8deb20a4eb3a818750040c409f59&' },
            content: 'Here is another post.',
            timestamp: '1 hour ago',
          },
          {
            id: 5,
            author: { name: 'Jane Smith', avatar: 'https://cdn.discordapp.com/attachments/1178319248012095509/1178328436557754430/Profile-2.png?ex=658833df&is=6575bedf&hm=2c773dd7496f21049256bf677a9a71a7ca0d8deb20a4eb3a818750040c409f59&' },
            content: 'Here is another post.',
            timestamp: '1 hour ago',
          },
          {
            id: 6,
            author: { name: 'Jane Smith', avatar: 'https://cdn.discordapp.com/attachments/1178319248012095509/1178328436557754430/Profile-2.png?ex=658833df&is=6575bedf&hm=2c773dd7496f21049256bf677a9a71a7ca0d8deb20a4eb3a818750040c409f59&' },
            content: 'Here is another post.',
            timestamp: '1 hour ago',
          },
          {
            id: 7,
            author: { name: 'Jane Smith', avatar: 'https://cdn.discordapp.com/attachments/1178319248012095509/1178328436557754430/Profile-2.png?ex=658833df&is=6575bedf&hm=2c773dd7496f21049256bf677a9a71a7ca0d8deb20a4eb3a818750040c409f59&' },
            content: 'Here is another post.',
            timestamp: '1 hour ago',
          },
          {
            id: 8,
            author: { name: 'Jane Smith', avatar: 'https://cdn.discordapp.com/attachments/1178319248012095509/1178328436557754430/Profile-2.png?ex=658833df&is=6575bedf&hm=2c773dd7496f21049256bf677a9a71a7ca0d8deb20a4eb3a818750040c409f59&' },
            content: 'Here is another post.',
            timestamp: '1 hour ago',
          },
          {
            id: 9,
            author: { name: 'Jane Smith', avatar: 'https://cdn.discordapp.com/attachments/1178319248012095509/1178328436557754430/Profile-2.png?ex=658833df&is=6575bedf&hm=2c773dd7496f21049256bf677a9a71a7ca0d8deb20a4eb3a818750040c409f59&' },
            content: 'Here is another post.',
            timestamp: '1 hour ago',
          },
          {
            id: 10,
            author: { name: 'Jane Smith', avatar: 'https://cdn.discordapp.com/attachments/1178319248012095509/1178328436557754430/Profile-2.png?ex=658833df&is=6575bedf&hm=2c773dd7496f21049256bf677a9a71a7ca0d8deb20a4eb3a818750040c409f59&' },
            content: 'Here is another post.',
            timestamp: '1 hour ago',
          },
          {
            id: 11,
            author: { name: 'Jane Smith', avatar: 'https://cdn.discordapp.com/attachments/1178319248012095509/1178328436557754430/Profile-2.png?ex=658833df&is=6575bedf&hm=2c773dd7496f21049256bf677a9a71a7ca0d8deb20a4eb3a818750040c409f59&' },
            content: 'Here is another post.',
            timestamp: '1 hour ago',
          },
      ];

  return (
    <main className=" w-3/6 top-10">
      <div className="bg-white p-4 rounded-lg shadow mb-4 flex items-center space-x-4">
        <img className="h-10 w-10 rounded-full" src="https://cdn.discordapp.com/attachments/1178319248012095509/1178328436557754430/Profile-2.png?ex=658833df&is=6575bedf&hm=2c773dd7496f21049256bf677a9a71a7ca0d8deb20a4eb3a818750040c409f59&" alt="User Avatar" />
        <input 
          className="form-input p-2 w-2/4 border rounded-md" 
          type="text" 
          placeholder="What's on your mind?" 
        />
        <FontAwesomeIcon icon={faCamera} className="h-5 w-5 text-gray-500" />
      </div>

      <div className="bg-white p-4 rounded-lg shadow mb-4">
        <ul className="flex space-x-4">
          <li className="text-blue-500 cursor-pointer">All Members</li>
          <li className="cursor-pointer">My Groups</li>
          <li className="cursor-pointer">My Favorites</li>
          <li className="cursor-pointer">Mentions</li>
        </ul>
      </div>

      {posts.map((post) => (
        <Post
          key={post.id}
          author={post.author}
          content={post.content}
          timestamp={post.timestamp}
        />
      ))}
    </main>
  );
}

export default MainContent;
