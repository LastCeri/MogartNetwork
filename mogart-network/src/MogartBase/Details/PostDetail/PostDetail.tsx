import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './PostDetail.css';

interface Post {
  Post_Title: string;
  Post_Author: string;
  Post_Image: string;
  Post_Content: string;
}

const PostDetail = () => {
  let { posturl } = useParams();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get<Post>(`http://localhost:3040/Posts/${posturl}`);
        setPost(response.data);
      } catch (error) {
        console.error('Post fetch error:', error);
      }
    };

    fetchPost();
  }, [posturl]); 

  return (
    <>
    <div className="hero">
        <h1>{post?.Post_Title}</h1>
        <span>By {post?.Post_Author}</span>
    </div>
    
    <div className="main-container">
      <main className="content">
        <img src={post?.Post_Image} alt={post?.Post_Title} className="post-detail-image"/>
        <div className="post-detail-content" dangerouslySetInnerHTML={{ __html: post?.Post_Content || '' }} />
      </main>

    </div>

    <aside className="sidebar">
    <h3>Latest Posts</h3>
    <ul>
        <li><a href="#">How to Foster Inclusive Conversations Online</a></li>
        <li><a href="#">5 Tips for Managing a Remote Community</a></li>
        <li><a href="#">The Rise of Niche Social Platforms</a></li>
    </ul>
    <h3>Upcoming Events</h3>
    <ul>
        <li><a href="#">Webinar: The Future of Digital Communities</a></li>
        <li><a href="#">Annual Meetup 2024</a></li>
        <li><a href="#">Live Q&A Session with Community Managers</a></li>
    </ul>
</aside>

    </>
  );
};

export default PostDetail;
