import React, { useState, useEffect } from 'react';
import { API_URL } from '../../../../Api/Api';
import { useNavigate } from 'react-router-dom';

interface LatestBlog {
    Bid: number;
    Bname: string;
    Bauthor: string;
    Bdate: string;
    Bimage: string;
    Burl: string;
    BauthorImage: string;
  }


  const BlogDetailsLatest = () => {
    const [blogs, setBlogs] = useState<LatestBlog[]>([]);
    const navigate = useNavigate();
    
    useEffect(() => {
      fetch(`${API_URL}/GetBlogsLatest`)
        .then(response => response.json())
        .then(data => setBlogs(data))
        .catch(error => {
          if (error.code === "ERR_NETWORK") {
            console.error('Network error:', error);
            navigate('/NetworkError');
          } else if (error.response) {
            console.error('BlogDetailsLatest data fetching failed:', error.response.data);
          } else {
            console.error('Error:', error.message);
          }
        });
    }, []);
  
    return (
      <aside className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
      <h3 className="font-bold text-2xl mb-4 text-gray-900">Latest Blogs</h3>
      <ul className="divide-y divide-gray-200">
        {blogs.map(blog => (
          <li key={blog.Bid} className="py-4 flex items-center space-x-4 last:pb-0 first:pt-0 transform hover:translate-x-2 transition-transform duration-200 ease-out">
            <img src={blog.Bimage || "placeholder-image-url.jpg"} alt="Post Thumbnail" className="w-16 h-16 rounded-lg object-cover shadow-sm" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center mb-1">
                <img src={blog.BauthorImage} alt="Author" className="w-10 h-10 rounded-full mr-2 object-cover shadow-sm" />
                <a href={`/Blogs/${blog.Bauthor.replace(' ','')}/${blog.Burl}`} className="text-lg font-semibold text-indigo-600 hover:text-indigo-800 transition-colors duration-150 ease-in-out">{blog.Bname}</a>
              </div>
              <p className="text-sm text-gray-500">Published on {blog.Bdate} by <span className="font-medium text-gray-700">{blog.Bauthor}</span></p>
            </div>
          </li>
        ))}
      </ul>
    </aside>
    );
  };
  
  export default BlogDetailsLatest;