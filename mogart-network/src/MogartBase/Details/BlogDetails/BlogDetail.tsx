import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../../ThemeParts/MainPart/Header/HeaderPart';
import Navbar from '../../ThemeParts/MainPart/Navbar/Navbar';

interface BlogPost {
  Blog_Name: string;
  Blog_Author: string;
  Blog_Image: string;
  Blog_Content: string;
}

const BlogDetail = () => {
  let { blogurl } = useParams();
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get<BlogPost>(`http://localhost:3040/Blogs/${blogurl}`);
        setBlogPost(response.data);
      } catch (error) {
        console.error('Blog post fetch error:', error);
      }
    };

    fetchPost();
  }, [blogurl]);

  return (
    <>    
      <Header />
      <Navbar />
      <div className="flex flex-row justify-center items-start mt-20">
        <main className="w-full max-w-4xl p-4">
          <div className="bg-gray-200 text-center py-6 rounded-lg">
            <h1 className="text-3xl font-bold">{blogPost?.Blog_Name}</h1>
            <span className="text-xl">By {blogPost?.Blog_Author}</span>
          </div>

          <div className="mt-4 bg-white shadow-lg rounded-lg overflow-hidden">
            <img src={blogPost?.Blog_Image} alt={blogPost?.Blog_Name} className="w-full h-auto"/>
            <div className="p-4" dangerouslySetInnerHTML={{ __html: blogPost?.Blog_Content || '' }} />
          </div>
        </main>

        <div className="px-4">
          <aside className="w-full max-w-sm p-6 bg-white shadow-lg rounded-lg">
                <h3 className="font-semibold text-xl mb-4 text-gray-800">Latest Blogs</h3>
                <ul className="space-y-2">
                    <li className="rounded-md flex items-start">
                        <img src="placeholder-image-url.jpg" alt="Post Thumbnail" className="w-10 h-10 mr-2 rounded-full" />
                        <div>
                            <a href="#" className="block text-sm hover:bg-gray-100 rounded-md text-blue-500 hover:text-blue-700">How to Foster Inclusive Conversations Online</a>
                            <p className="text-xs text-gray-600">Published on Jan 1, 2024 by Author A</p>
                        </div>
                    </li>
                    <li className="rounded-md flex items-start">
                        <img src="placeholder-image-url.jpg" alt="Post Thumbnail" className="w-10 h-10 mr-2 rounded-full" />
                        <div>
                            <a href="#" className="block text-sm hover:bg-gray-100 rounded-md text-blue-500 hover:text-blue-700">5 Tips for Managing a Remote Community</a>
                            <p className="text-xs text-gray-600">Published on Feb 1, 2024 by Author B</p>
                        </div>
                    </li>
                    <li className="rounded-md flex items-start">
                        <img src="placeholder-image-url.jpg" alt="Post Thumbnail" className="w-10 h-10 mr-2 rounded-full"/>
                        <div>
                            <a href="#" className="block text-sm hover:bg-gray-100 rounded-md text-blue-500 hover:text-blue-700">The Rise of Niche Social Platforms</a>
                            <p className="text-xs text-gray-600">Published on Mar 1, 2024 by Author C</p>
                        </div>
                    </li>
                </ul>
            </aside>
            <div className="mb-8"></div>
            <aside className="w-full max-w-sm p-6 bg-white shadow-lg rounded-lg">
              <h3 className="font-semibold text-xl mb-4 text-gray-800">Categories</h3>
              <ul className="space-y-2">
                  <li className="rounded-md flex items-start">
                      <img src="category-icon-1.jpg" alt="Category Icon 1" className="w-10 h-10 mr-2 rounded-full" />
                      <div>
                          <a href="#" className="block text-sm font-semibold text-blue-500 hover:text-blue-700">Technology</a>
                          <p className="text-xs text-gray-600">Latest trends and innovations</p>
                      </div>
                  </li>
                  <li className="rounded-md flex items-start">
                      <img src="category-icon-2.jpg" alt="Category Icon 2" className="w-10 h-10 mr-2 rounded-full" />
                      <div>
                          <a href="#" className="block text-sm font-semibold text-blue-500 hover:text-blue-700">Health & Wellness</a>
                          <p className="text-xs text-gray-600">Tips for a healthy lifestyle</p>
                      </div>
                  </li>
                  <li className="rounded-md flex items-start">
                      <img src="category-icon-3.jpg" alt="Category Icon 3" className="w-10 h-10 mr-2 rounded-full"/>
                      <div>
                          <a href="#" className="block text-sm font-semibold text-blue-500 hover:text-blue-700">Travel</a>
                          <p className="text-xs text-gray-600">Explore new destinations</p>
                      </div>
                  </li>
              </ul>
            </aside>
        </div>
      </div>
    </>
  );
};

export default BlogDetail;
