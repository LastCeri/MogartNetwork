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
      <aside className="w-full max-w-sm p-6 bg-white shadow-lg rounded-lg">
        <h3 className="font-semibold text-xl mb-4 text-gray-800">Latest Blogs</h3>
        <ul className="space-y-2">
          {blogs.map(blog => (
            <li key={blog.Bid} className="rounded-md flex items-start">
              <img src={blog.Bimage || "placeholder-image-url.jpg"} alt="Post Thumbnail" className="w-10 h-10 mr-2 rounded-full" />
              <div>
                <a href={blog.Burl} className="block text-sm hover:bg-gray-100 rounded-md text-blue-500 hover:text-blue-700">{blog.Bname}</a>
                <p className="text-xs text-gray-600">Published on {blog.Bdate} by {blog.Bauthor}</p>
              </div>
            </li>
          ))}
        </ul>
      </aside>
    );
  };
  
  export default BlogDetailsLatest;