import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import './PostContent.css';

interface Post {
  title: string;
  author: string;
  category: string;
  excerpt: string;
  image: string;
}


const initialPosts: Post[] = [
  {
    title: 'The City Life of the Future',
    author: 'Mogart Admin',
    category: 'Futurism',
    excerpt: 'Imagine a world where the skyline is dotted with levitating vehicles and the glow of holographic ads illuminates the night.',
    image: 'https://cdn.discordapp.com/attachments/1172724411376336936/1172724500140412938/City_Life_of_the_Future.png?text=Future+City+Life',
  },
  {
    title: 'Coffee and Books Bliss',
    author: 'Mogart Admin',
    category: 'Lifestyle',
    excerpt: "There's a serene comfort in the simple pleasures of sipping a warm coffee and flipping through the pages of a gripping novel.",
    image: 'https://cdn.discordapp.com/attachments/1172724411376336936/1172724501184794664/Enjoying_Coffee_and_Books.png?text=Coffee+and+Books',
  },
  {
    title: 'Dreams of Space Travel',
    author: 'Mogart Admin',
    category: 'Space',
    excerpt: 'Gaze out from the helm of a starship, where the majestic tapestry of the Milky Way unfolds before you.',
    image: 'https://cdn.discordapp.com/attachments/1172724411376336936/1172724502568915025/Space_Travel_Dreams.png?text=Space+Travel',
  },
  {
    title: 'A Peaceful Forest Stroll',
    author: 'Mogart Admin',
    category: 'Nature',
    excerpt: 'Wander along a forest trail where the light dances through the leaves and every step brings a sense of peace.',
    image: 'https://cdn.discordapp.com/attachments/1172724411376336936/1172724498345250906/A_Calm_Forest_Walk.png?text=Forest+Stroll',
  },
  {
    title: 'A Future Powered by Robots',
    author: 'Mogart Admin',
    category: 'Robotics',
    excerpt: 'Envision a future where humanoid robots bustle about a factory, their precise movements a ballet of efficiency.',
    image: 'https://cdn.discordapp.com/attachments/1172724411376336936/1172724501818114179/Future_Where_Robots_Work.png?text=Robot+Future',
  },
  {
    title: 'A Day from Ancient Times',
    author: 'Mogart Admin',
    category: 'History',
    excerpt: 'Step back into the grandeur of ancient times, where the golden hues of sunset bathe timeless architecture.',
    image: 'https://cdn.discordapp.com/attachments/1172724411376336936/1172724498945028177/A_Day_in_Ancient_Times.png?text=Ancient+Times',
  },
  {
    title: 'An Underwater Adventure',
    author: 'Mogart Admin',
    category: 'Adventure',
    excerpt: 'Dive into an underwater odyssey where the vibrant hues of coral gardens come to life.',
    image: 'https://cdn.discordapp.com/attachments/1172724411376336936/1172724499511246931/An_Adventure_Under_the_Ocean.png?text=Underwater+Adventure',
  },
  {
    title: 'Cosmic Sky Wonders',
    author: 'Mogart Admin',
    category: 'Astronomy',
    excerpt: 'Look up to the celestial grandeur of a sky brimming with stars, revealing the extraordinary wonders above us.',
    image: 'https://cdn.discordapp.com/attachments/1172724411376336936/1172724500719218779/Cosmic_Sky_Miracles.png?text=Cosmic+Sky',
  },
];


const PostContent: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [hasMoreItems, setHasMoreItems] = useState(false); 

  return (
    <div className="post-content">
      <InfiniteScroll
        dataLength={posts.length}
        hasMore={hasMoreItems} 
        loader={<div>Loading...</div>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>You have seen it all</b>
          </p>
        }
      >
        {posts.map((post, index) => (
          <div key={index} className="text-posts">
            <img src={post.image} alt={post.title} />
            <div>
              <h2>{post.title}</h2>
              <p className="metadata">{post.author} - {post.category}</p>
              <p className="excerpt">{post.excerpt}</p>
            </div>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default PostContent;
