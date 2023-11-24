import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './BlogDetail.css';

const BlogDetail = () => {
  let { blogurl } = useParams();
  const [blogPost, setBlogPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:3040/Blogs/${blogurl}`);
        setBlogPost(response.data);
      } catch (error) {
        console.error('Blog post fetch error:', error);
      }
    };

    fetchPost();
  }, [blogurl]); 

  if (!blogPost) {
    return <div>Loading...</div>; 
  }

  return (
    <>    
    <div className="header">
      <span className="social-score">Social Score</span>
      <span className="title">Mogart Network</span>
      <button className="menu-btn">...</button>
    </div>

    <div className="hero">
        <h1>{blogPost.Blog_Name}</h1>
        <span>By {blogPost.Blog_Author}</span>
    </div>
    
<div className="main-container"> <main className="content">
<img src={blogPost.Blog_Image} alt={blogPost.Blog_Name} className="blog-detail-image"/>
<div className="blog-detail-content" dangerouslySetInnerHTML={{ __html: blogPost.Blog_Content }} />
</main>

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
</aside></div>
    </>
  );
};

export default BlogDetail;
