import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../../ThemeParts/MainPart/Header/HeaderPart';
import Navbar from '../../ThemeParts/MainPart/Navbar/Navbar';
import BlogDetailsCategories from './components/Categories/categories';
import BlogDetailsLatest from './components/Latest/Latest';
import { API_URL } from '../../Api/Api';

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
        const response = await axios.get<BlogPost>(`${API_URL}/GetBlogs/${blogurl}`);
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
            <BlogDetailsLatest />
            <div className="mb-8"></div>
            <BlogDetailsCategories />
        </div>
      </div>
    </>
  );
};

export default BlogDetail;
