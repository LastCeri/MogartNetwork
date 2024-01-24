import React, { useState, useEffect } from 'react';
import { API_URL } from '../../../../../../Api/Api';
import axios from 'axios';


export default function LeftSidebarComponentsBlogs() {
    const [blogs, setBlogs] = useState<{ Bid: number; Bimage: string; Bname: string ,Burl:string}[]>([]);
    
    useEffect(() => {
        const apiUrl = `${API_URL}/GetBlogs`;
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
                <li key={blog.Bid} className="hover:bg-gray-100 rounded-md transition duration-200">
                 <a href={`/Blogs/${blog.Burl}`} className="flex items-center space-x-2 p-2">
                  <img className="h-6 w-6 rounded-lg no-repeat" src={blog.Bimage} alt="Blog Thumbnail" />
                    <span className="text-sm font-medium">{blog.Bname}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </>
      );
    }


