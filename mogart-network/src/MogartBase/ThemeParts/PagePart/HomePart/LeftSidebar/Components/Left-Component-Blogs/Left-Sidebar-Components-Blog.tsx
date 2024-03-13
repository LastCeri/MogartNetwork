import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../../../../../Api/Api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faFolderOpen,faCalendarDays } from '@fortawesome/free-solid-svg-icons';

interface Blog {
  Bid: number;
  Bimage: string;
  Bname: string;
  Burl: string;
  Bdate: string;
  Bviews: string;
  Bcategory: string;
  Bauthor: string;
  BauthorImage: string;
}

export default function LeftSidebarComponentsBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const apiUrl = `${API_URL}/GetBlogs`;
    axios.get<Blog[]>(apiUrl)
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
        <ul className="space-y-4">
          {blogs.map((blog) => (
            <li key={blog.Bid} className="hover:bg-gray-100 rounded-md transition duration-200 p-2">
              <a href={`/Blogs/${blog.Burl}`} className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <img className="h-12 w-12 rounded-lg" src={blog.Bimage} alt="Blog Thumbnail" />
                <div className="flex-1">
                  <span className="text-ms font-medium">{blog.Bname}</span>
                  <div className="text-xs text-gray-500 mt-1">
                    <div className="flex items-center">
                      <img className="h-6 w-6 rounded-full" src={blog.BauthorImage} alt="Author" />
                      <span className="ml-2">Author: {blog.Bauthor}</span>
                    </div>
                    <p><FontAwesomeIcon icon={faCalendarDays} /> {blog.Bdate}</p>
                    <p><FontAwesomeIcon icon={faFolderOpen} /> {blog.Bcategory}</p>
                    <div className="flex items-center">
                      <FontAwesomeIcon icon={faEye} />
                      <span className="ml-2"> {blog.Bviews}</span>
                    </div>
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
