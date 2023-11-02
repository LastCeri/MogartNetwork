import React, { useState, useEffect} from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import './PostContent.css';


const PostContent: React.FC = () => {
  const [posts, setPosts] = useState<string[]>([]);
  const [hasMoreItems, setHasMoreItems] = useState(true);


  const loadPosts = (count: number = 10) => {
    const currentLength = posts.length;

    if (currentLength >= 50) {
      setHasMoreItems(false);
      return;
    }

    const newCount = Math.min(count, 50 - currentLength); 
    const newPosts = Array.from({ length: newCount }, (_, i) => `Post content ${currentLength + i + 1}`);

    setPosts(prevPosts => [...prevPosts, ...newPosts]);

    if (currentLength + newCount >= 50) {
      setHasMoreItems(false);
    }
  };


  useEffect(() => {
    loadPosts(50);
  }, []);


  return (
    <div className="post-content">
      <InfiniteScroll
        pageStart={0}
        loadMore={loadPosts}
        hasMore={hasMoreItems}
        loader={<div key={0}>Loading ...</div>}
      >
        {posts.map((post, index) => (
          <div key={index} className="text-posts">
            <p>{post}</p>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
}
export default PostContent;
