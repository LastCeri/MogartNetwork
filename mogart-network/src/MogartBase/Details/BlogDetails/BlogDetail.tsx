import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { faThumbsUp, faEye, faThumbsDown, faMessage,faTags,faFolderOpen,faUserPlus,faShareNodes } from '@fortawesome/free-solid-svg-icons';
import Header from '../../ThemeParts/MainPart/Header/HeaderPart';
import Navbar from '../../ThemeParts/MainPart/Navbar/Navbar';
import BlogDetailsCategories from './components/Categories/categories';
import BlogDetailsLatest from './components/Latest/Latest';
import { API_URL } from '../../Api/Api';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface BlogPost {
  Bid: number;
  Bname: string;
  Bauthor: string;
  BauthorImage: string;
  Bcategory: string;
  Bcontent: string;
  Bdate: string;
  Bimage: string;
  Btags: string;
  Burl: string;
  Bviews: number;
}

const icons = [
  { icon: faUserPlus, alt: 'Follow', to: '/', style: { color: "#545e75" }},
  { icon: faThumbsUp, alt: 'Like', to: '/Search', style: { color: "#545e75" }},
  { icon: faThumbsDown, alt: 'DisLike', to: '/Notifications', style: { color: "#545e75" }},
  { icon: faMessage, alt: 'Message', to: '/Groups', style: { color: "#545e75" }},
  { icon: faShareNodes, alt: 'Share', to: '/Share', style: { color: "#545e75" }},
];


const BlogDetail = () => {
  const { blogurl } = useParams();
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get<BlogPost[]>(`${API_URL}/GetBlogs/${blogurl}`);
        if (response.data && response.data.length > 0) {
          setBlogPost(response.data[0]);
        }
      } catch (error) {
        console.error('Error fetching blog post:', error);
      }
    };

    if (blogurl) {
      fetchPost();
    }
  }, [blogurl]);

  if (!blogPost) {
    return <div>Loading...</div>;
  }

  return (
    <>    
      <Header />
      <Navbar />
      <div className="flex flex-row justify-center items-start mt-20">
        <main className="w-full max-w-4xl mx-auto p-4">

          {/* Blog header */}
          <header className="text-center py-6 mb-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-4xl font-sans mb-2 mt-2">{blogPost.Bname}</h1>
            <div className="flex justify-center items-center text-gray-600 mt-6">

              <img src={blogPost.BauthorImage} alt="Author" className="w-20 h-20 rounded-full mr-2" />
              <div className="inline-flex flex-col">
                <span className="font-semibold text-lg">{blogPost.Bauthor}</span>
                <time className="text-sm" dateTime={blogPost.Bdate}>{blogPost.Bdate}</time>
              </div>
            </div>

            <div className="mt-4">
              {icons.map((item, index) => (
              <button key={index} className={`mb-4 ${index === 0 ? 'mb-2' : ''} hover:bg-gray-200 p-2 rounded-full transition duration-300`}>
                <FontAwesomeIcon icon={item.icon} className="h-4 w-8" style={item.style} /> {item.alt}
              </button>
            ))}
          </div>
          </header>

            {/* Blog Image */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-6">
              <img src={blogPost.Bimage} alt={blogPost.Bname} className="w-5/6 max-h-[400px] h-auto mx-auto"/>
            </div>

            {/* Blog Content */}
            <div className="bg-white shadow-lg rounded-lg p-6 overflow-hidden">
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: blogPost.Bcontent }} />
            </div>
            <div>
              <span className="bg-slate-100 shadow-lg rounded-lg p-2 overflow-hidden" >
                <FontAwesomeIcon icon={faEye} /> {blogPost.Bviews} 
              </span>
              <span className="bg-slate-100 shadow-lg rounded-lg p-2 overflow-hidden" >
                <FontAwesomeIcon icon={faTags} />{blogPost.Btags && blogPost.Btags.split(',').map(tag => (
                <span key={tag} className="bg-gray-100 text-gray-700 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                  {tag.trim()}
                </span>
                ))}
              </span>
              <span className="float-right bg-slate-100 text-blue-700 text-xs font-semibold inline-block px-3 p-2 rounded-full shadow-lg">
                <FontAwesomeIcon icon={faFolderOpen} /> {blogPost.Bcategory}
              </span>
          </div>
        </main>
      <aside className="px-4">
        <BlogDetailsLatest />
        <div className="mb-8"></div>
        <BlogDetailsCategories />
      </aside>
    </div>
    </>
  );
};

export default BlogDetail;
