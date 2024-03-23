import React, { useState, useEffect } from 'react';
import { API_URL } from '../../../../Api/Api';

interface LatestBlog {
    Bid: number;
    Bname: string;
    Bauthor: string;
    Bdate: string;
    Bimage: string;
    Burl: string;
  }


  const BlogDetailsLatest = () => {
    const [blogs, setBlogs] = useState<LatestBlog[]>([]);
  
    useEffect(() => {
      fetch(`${API_URL}/GetBlogsLatest`)
        .then(response => response.json())
        .then(data => setBlogs(data))
        .catch(error => console.error('Error fetching latest blogs:', error));
    }, []);
  
    return (
      <aside className="w-full max-w-md p-8 mr-8 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out">
        <h3 className="font-bold text-2xl mb-2 text-gray-900">Latest Blogs</h3>
        <ul className="divide-y divide-gray-200">
          {blogs.map(blog => (
            <li key={blog.Bid} className="py-2 last:pb-0 first:pt-0 transform hover:translate-x-2 transition-transform duration-200 ease-out">
              <img src={blog.Bimage || "placeholder-image-url.jpg"} alt="Post Thumbnail" className="w-12 h-12 rounded-full object-cover shadow-sm" />
              <div className="flex-1 min-w-0">
                <a href={blog.Burl} className="text-lg font-semibold text-indigo-600 hover:text-indigo-800 transition-colors duration-150 ease-in-out block">{blog.Bname}</a>
                <p className="text-sm text-gray-500 mt-1">Published on {blog.Bdate} by {blog.Bauthor}</p>
              </div>
            </li>
          ))}
        </ul>
      </aside>
    );
  };
  
  export default BlogDetailsLatest;