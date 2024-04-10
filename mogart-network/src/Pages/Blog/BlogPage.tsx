import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faEye, faFolderOpen, faSearch } from '@fortawesome/free-solid-svg-icons';
import { API_URL } from '../../MogartBase/Api/Api';
import Header from '../../MogartBase/ThemeParts/MainPart/Header/HeaderPart';
import Navbar from '../../MogartBase/ThemeParts/MainPart/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';

interface Blog {
  Bid: number;
  Bimage: string;
  Bname: string;
  Burl: string;
  Bdate: string;
  Bviews: string;
  Bcategory: string;
  Bdesc: string;
  Bauthor: string;
  BauthorImage: string;
}

const Blog: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [authors, setAuthors] = useState<string[]>([]);
  const [selectedAuthor, setSelectedAuthor] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate();
  
  useEffect(() => {
    const apiUrl = `${API_URL}/GetBlogs`;
    axios.get<Blog[]>(apiUrl)
      .then((response) => {
        const data = response.data;
        setBlogs(data);
        setFilteredBlogs(data);
        const uniqueCategories = Array.from(new Set(data.map(blog => blog.Bcategory)));
        setCategories(uniqueCategories);
        const uniqueAuthors = Array.from(new Set(data.map(blog => blog.Bauthor)));
        setAuthors(uniqueAuthors);
      })
      .catch(error => {
        if (error.code === "ERR_NETWORK") {
          console.error('Network error:', error);
          navigate('/NetworkError');
        } else if (error.response) {
          console.error('Blogs data fetching failed:', error.response.data);
        } else {
          console.error('Error:', error.message);
        }
      });
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      setFilteredBlogs(blogs.filter(blog => blog.Bcategory === selectedCategory));
    } else {
      setFilteredBlogs(blogs);
    }
  }, [selectedCategory, blogs]);

  useEffect(() => {
    let tempBlogs = blogs;
    if (selectedCategory) {
      tempBlogs = tempBlogs.filter(blog => blog.Bcategory === selectedCategory);
    }
    if (selectedAuthor) {
      tempBlogs = tempBlogs.filter(blog => blog.Bauthor === selectedAuthor);
    }
    if (searchTerm.trim() !== '') {
      tempBlogs = tempBlogs.filter(blog => blog.Bname.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    setFilteredBlogs(tempBlogs);
  }, [selectedCategory, selectedAuthor, searchTerm, blogs]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  return (
    <>
      <Header />
      <Navbar />
      <div className="container mx-auto px-4 py-8 mt-12">
        <div className="flex justify-between items-center mb-8">
          <div className="relative">
            <input
              type="text"
              className="bg-gray-100 text-gray-800 border border-gray-300 focus:outline-none focus:border-blue-500 rounded-full py-2 px-4 pr-10"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute right-0 top-0 mt-3 mr-4">
              <FontAwesomeIcon icon={faSearch} className="text-gray-600" />
            </div>
          </div>
          <div className="flex bg-gray-50 px-4 py-2 rounded-full ">
            {categories.map(category => (
             <button
             key={category}
             className={`mr-4 px-4 py-2 rounded-full text-sm font-medium focus:outline-none transition duration-150 ease-in-out transform hover:scale-105 ${category === selectedCategory ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg' : 'bg-gray-200 text-gray-800 hover:bg-gray-300 shadow-sm'}`}
             onClick={() => handleCategoryChange(category)}
           >
             {category}
           </button>
            ))}
          </div>
          <div className="flex">
              <button
                className="bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg inline-flex items-center justify-center w-full"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {selectedAuthor || "Select Author"}
                <svg className="fill-current h-4 w-4 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M5.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.575 0 0.436 0.445 0.408 1.197 0 1.615l-4.695 4.502c-0.533 0.481-1.408 0.481-1.942 0l-4.695-4.502c-0.408-0.418-0.436-1.17 0-1.615z"/>
                </svg>
              </button>
              {isDropdownOpen && (
                <div className="absolute bg-white border rounded w-full z-10">
                <div
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSelectedAuthor(null);
                    setIsDropdownOpen(false);
                  }}
                >
                  All Authors
                </div>
                {authors.map(author => (
                  <div
                    key={author}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSelectedAuthor(author);
                      setIsDropdownOpen(false);
                    }}
                  >
                    {author}
                  </div>
                ))}
              </div>
              )}
            </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredBlogs.map((blog) => (
            <div key={blog.Bid} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <a href={`/Blogs/${blog.Bauthor.replace(' ','')}/${blog.Burl}`}>
                <img className="w-full h-48 object-fit rounded-t-lg" src={blog.Bimage} alt={blog.Bdesc|| blog.Bname+" - Mogart Network"} />
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
                    <img className="h-8 w-8 rounded-full object-cover" src={blog.BauthorImage} alt="Author" />
                    <span className="ml-2 text-sm font-medium text-gray-900"><a href={`/Author/${blog.Bauthor.replace(' ','')}`} >{blog.Bauthor} </a></span>
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
      </div>
    </>
  );
};

export default Blog;
