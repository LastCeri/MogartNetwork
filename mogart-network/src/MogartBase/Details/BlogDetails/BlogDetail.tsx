import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { faThumbsUp, faEye, faThumbsDown, faMessage, faTags, faFolderOpen, faUserPlus, faShare } from '@fortawesome/free-solid-svg-icons';
import Header from '../../ThemeParts/MainPart/Header/HeaderPart';
import Navbar from '../../ThemeParts/MainPart/Navbar/Navbar';
import BlogDetailsCategories from './components/Categories/categories';
import BlogDetailsLatest from './components/Latest/Latest';
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
  Bcontent: string;
  Bdate: string;
  Bimage: string;
  Btags: string;
  Burl: string;
  Bviews: number;
}

const icons = [
  { icon: faUserPlus, alt: 'Follow', to: '/', style: { color: "#545e75" } },
  { icon: faThumbsUp, alt: 'Like', to: '/Like', style: { color: "#545e75" } },
  { icon: faThumbsDown, alt: 'DisLike', to: '/Dislike', style: { color: "#545e75" } },
  { icon: faMessage, alt: 'Message', to: '/MessageTo', style: { color: "#545e75" } },
  { icon: faShare, alt: 'Share', to: '/Share', style: { color: "#545e75" } },
];

const BlogDetail = () => {
  const { blogurl } = useParams();
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [tags, setTags] = useState<[]>([]);
  const [showSharePopup, setShowSharePopup] = useState(false);
  const { siteData, data,isLoading,isLoggedIn } = useData();
  const navigate = useNavigate();

  const SendLike = async (globalId: string) => { if(!isLoading && !isLoggedIn){return;} await PostSendLike({UserID:data.UserName, ContentID:globalId, ContentType:"BlogContent"}); };
  const SendDisLike = async (globalId: string) => { if(!isLoading && !isLoggedIn){return;} await PostSendDislike({UserID:data.UserName, ContentID:globalId, ContentType:"BlogContent"}); };

  useEffect(() => {
    if (isLoading || !blogurl) return;
    if(siteData.SiteStatus != "1") navigate('/');
    
    const fetchBlog = async () => {
      try {
        const response = await axios.get<BlogPost[]>(`${API_URL}/GetBlogs/${blogurl}`);
        if (response.data && response.data.length > 0) {
          setBlogPost(response.data[0]);
          const parsedtags = JSON.parse(response.data[0].Btags);
          setTags(parsedtags);
        }
      } catch (error) {
        console.error('Error fetching blog post:', error);
      }
    };

    if (blogurl) {
      fetchBlog();
    }
  }, [blogurl,isLoading]);

  if (!blogPost) {
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
        <main className="w-full max-w-4xl mx-auto p-4">

            {/* Blog header */}
            <header className="text-center py-6 mb-6 bg-white rounded-lg shadow-lg">
                <h1 className="text-4xl font-sans mb-2 mt-2">{blogPost.Bname}</h1>
                <div className="flex justify-center items-center text-gray-600 mt-6">

                    <img src={blogPost.BauthorImage} alt="Author" className="w-20 h-20 rounded-full mr-2" />
                    <div className="inline-flex flex-col">
                    <a href={`/Author/${blogPost.Bauthor.replace(' ','')}`} ><span className="font-semibold text-lg">{blogPost.Bauthor}</span></a>
                        <time className="text-sm" dateTime={blogPost.Bdate}>{blogPost.Bdate}</time>
                    </div>
                </div>

                <div className="mt-4">
                {icons.map((item, index) => (
                    <button key={index} 
                            className={`mb-4 ${index === 0 ? 'mb-2' : ''} hover:bg-gray-200 p-2 rounded-full transition duration-300`}
                            onClick={() => {
                              if(item.alt === 'Share') {
                                handleShareClick();
                              } else if(item.alt === 'Like') {
                                SendLike(blogPost?.Bid.toString());
                              } else if(item.alt === 'DisLike') {
                                SendDisLike(blogPost?.Bid.toString());
                              }
                            }}>
                        <FontAwesomeIcon icon={item.icon} className="h-4 w-8" style={item.style} /> {item.alt}
                    </button>
                ))}
                </div>
            </header>

            {/* Blog Image */}
            <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-6">
                <img src={blogPost.Bimage} alt={blogPost.Bname} className="w-5/6 max-h-[400px] h-auto mx-auto" />
            </div>

            {/* Blog Content */}
            <div className="bg-white shadow-lg rounded-lg p-6 overflow-hidden">
                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: blogPost.Bcontent }} />
            </div>
            <div>
                <span className="bg-slate-100 shadow-lg rounded-lg p-2 overflow-hidden">
                    <FontAwesomeIcon icon={faEye} /> {blogPost.Bviews}
                </span>
                <span className="bg-slate-100 shadow-lg rounded-lg p-2 overflow-hidden">
                    <Link to={`/Tags/${blogPost.Btags}`}>
                    <FontAwesomeIcon icon={faTags} />
                    {blogPost.Btags &&
                    tags.map(tag => {
                    const trimmedTag = tag;
                    return (
                    <Link key={trimmedTag} to={`/Tags/${trimmedTag}`} className="bg-gray-100 text-gray-700 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                    {trimmedTag}
                    </Link>
                    );
                    })}
                    </Link>
                </span>
                <span className="float-right bg-slate-100 text-blue-700 text-xs font-semibold inline-block px-3 p-2 rounded-full shadow-lg">
                    <Link to={`/Category/${blogPost.Bcategory}`} className="text-blue-500 hover:text-blue-700">
                    <FontAwesomeIcon icon={faFolderOpen} /> {blogPost.Bcategory}
                    </Link>
                </span>
            </div>
        </main>
        <aside className="px-4">
            <BlogDetailsLatest />
            <div className="mb-8"></div>
            <BlogDetailsCategories />
        </aside>
    </div>
      {showSharePopup && <SharePopup url={blogPost.Burl} title={blogPost.Bname} onClose={handleClosePopup} />}
    </>
  );
};

export default BlogDetail;
