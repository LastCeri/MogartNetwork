import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { faThumbsUp, faEye, faThumbsDown, faMessage, faTags, faFolderOpen, faUserPlus, faShare, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import Header from '../../ThemeParts/MainPart/Header/HeaderPart';
import Navbar from '../../ThemeParts/MainPart/Navbar/Navbar';
import { API_URL, PostSendDislike, PostSendLike } from '../../Api/Api';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SharePopup from '../../ThemeParts/Popup/SharePopup';
import { useData } from '../../Context/DataContext';

interface BlogPost {
  Bid: string;
  Bname: string;
  Bauthor: string;
  BauthorImage: string;
  Bcategory: string;
  Bdesc: string;
  Bcontent: string;
  Bdate: string;
  Bimage: string;
  Btags: string;
  Burl: string;
  Bviews: number;
}

const icons = [
  { icon: faUserPlus, alt: 'Follow', to: '/', style: { color: "#545e75" } },
  { icon: faMessage, alt: 'Message', to: '/MessageTo', style: { color: "#545e75" } },
  { icon: faShare, alt: 'Share', to: '/Share', style: { color: "#545e75" } },
];

const AuthorDetail = () => {
  const { author } = useParams();
  const [blogs, setBlogPost] = useState<BlogPost[]>([]);
  const [showSharePopup, setShowSharePopup] = useState(false);
  const { siteData, data, isLoading, isLoggedIn } = useData();
  const navigate = useNavigate();
  
  const SendLike = async (globalId: string) => { if (!isLoading && !isLoggedIn) { return; } await PostSendLike({ UserID: data.UserName, ContentID: globalId, ContentType: "BlogContent" }); };
  const SendDisLike = async (globalId: string) => { if (!isLoading && !isLoggedIn) { return; } await PostSendDislike({ UserID: data.UserName, ContentID: globalId, ContentType: "BlogContent" }); };

  useEffect(() => {
    if (isLoading || !author) return;
    if(siteData.SiteStatus != "1") navigate('/');
    
    const fetchAuthor = async () => {
      try {
        const response = await axios.get<BlogPost[]>(`${API_URL}/GetAuthor/${author}`);
        if (response.data && response.data.length > 0) {
          setBlogPost(response.data); 
        }
      } catch (error) {
        console.error('Error fetching blog post:', error);
      }
    };

    if (author) {
      fetchAuthor();
    }
  }, [author, isLoading]);

  if (!blogs.length) { 
    return <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      <p className="text-lg text-purple-600 font-semibold ml-4">Loading...</p>
    </div>;
  }

  const handleShareClick = () => {
    setShowSharePopup(true);
  };

  const handleClosePopup = () => {
    setShowSharePopup(false);
  };
  return (
    <>
      <Header />
      <Navbar />
      <div className="flex flex-row justify-center items-start mt-20">
      <main className="w-full max-w-7xl mx-auto p-4">
  <header className="text-center py-6 mb-6 bg-white rounded-lg shadow-lg">
    <h1 className="text-4xl font-sans mb-2 mt-2">{blogs[0].Bname}</h1>
    <div className="flex justify-center items-center text-gray-600 mt-6">
      <img src={blogs[0].BauthorImage} alt="Author" className="w-20 h-20 rounded-full mr-2" />
      <div className="inline-flex flex-col">
        <span className="font-semibold text-lg">{blogs[0].Bauthor}</span>
        <time className="text-sm" dateTime={blogs[0].Bdate}>{blogs[0].Bdate}</time>
      </div>
    </div>
    <div className="mt-4">
      {icons.map((item, index) => (
        <button key={index} 
                className={`mb-4 ${index === 0 ? 'mb-2' : ''} hover:bg-gray-200 p-2 rounded-full transition duration-300`}
                onClick={() => {
                  if(item.alt === 'Share') {
                    handleShareClick();
                  }
                }}>
          <FontAwesomeIcon icon={item.icon} className="h-4 w-8" style={item.style} /> {item.alt}
        </button>
      ))}
    </div>
  </header>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {blogs.map((blog) => (
      <div key={blog.Bid} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <a href={`/Blogs/${blog.Bauthor.replace(' ','')}/${blog.Burl}`} >
          <img className="w-full h-48 object-fit rounded-t-lg" src={blog.Bimage} alt={blog.Bdesc} />
        </a>
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">{blog.Bname}</h2>
          <div className="flex items-center text-gray-700 text-sm mb-3">
            <div className="mr-4 flex items-center">
              <FontAwesomeIcon icon={faCalendarDays} className="mr-1" />
              <span>{blog.Bdate}</span>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faFolderOpen} className="mr-1" />
              <span>{blog.Bcategory}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img className="h-8 w-8 rounded-full object-cover" src={blog.BauthorImage} alt={blog.Bdesc} />
              <span className="ml-2 text-sm font-medium text-gray-900">{blog.Bauthor}</span>
              <span className="ml-2 text-sm font-medium text-gray-900"><FontAwesomeIcon icon={faEye} className="mr-1" />{blog.Bviews}</span>
            </div>
            <a href={`/Blogs/${blog.Bauthor.replace(' ','')}/${blog.Burl}`} 
                    className="inline-block py-2 px-3 rounded-full text-sm font-medium text-white transition transform hover:scale-105 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-md hover:shadow-lg">
                      Read More
                  </a>
          </div>
        </div>
      </div>
    ))}
  </div>
  {showSharePopup && <SharePopup url={`https://mogart-network.vercel.app/Author/${blogs[0].Bauthor.replace(' ','')}`} title={blogs[0].Bname} onClose={() => setShowSharePopup(false)} />}
</main>

    </div>
    </>
  );
};

export default AuthorDetail;
