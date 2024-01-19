import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function LeftSidebarComponentsBlogs() {
    const [blogs, setBlogs] = useState<{ id: number; Blog_Image: string; Blog_Name: string ,Blog_Url:string}[]>([]);
    
    useEffect(() => {
        const apiUrl = 'http://localhost:3040/Blogs/general';
        axios.get(apiUrl)
          .then((response) => {
            setBlogs(response.data);
          })
          .catch((error) => {
            console.error('Error fetching data from API:', error);
          });
      }, []);

      return (
        <>
          <div className="mb-10 bg-white rounded-lg shadow p-4">
            <h5 className="text-lg font-semibold mb-2">BLOGS</h5>
            <ul className="space-y-2">
              {blogs.map((blog) => (
                <li key={blog.id} className="hover:bg-gray-100 rounded-md transition duration-200">
                 <a href={`/Blogs/${blog.Blog_Url}`} className="flex items-center space-x-2 p-2">
                  <img className="h-6 w-6 rounded-lg no-repeat" src={blog.Blog_Image} alt="Blog Thumbnail" />
                    <span className="text-sm font-medium">{blog.Blog_Name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </>
      );
    }


