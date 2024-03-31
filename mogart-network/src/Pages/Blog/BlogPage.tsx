import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faEye, faFolderOpen, faSearch } from '@fortawesome/free-solid-svg-icons';
import { API_URL } from '../../MogartBase/Api/Api';
import Header from '../../MogartBase/ThemeParts/MainPart/Header/HeaderPart';
import Navbar from '../../MogartBase/ThemeParts/MainPart/Navbar/Navbar';

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

const Blog: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const apiUrl = `${API_URL}/GetBlogs`;
    axios.get<Blog[]>(apiUrl)
      .then((response) => {
        const data = response.data;
        setBlogs(data);
        setFilteredBlogs(data);
        const uniqueCategories = Array.from(new Set(data.map(blog => blog.Bcategory)));
        setCategories(uniqueCategories);
      })
      .catch((error) => {
        console.error('Error fetching data from API:', error);
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
    if (searchTerm.trim() !== '') {
      setFilteredBlogs(blogs.filter(blog => blog.Bname.toLowerCase().includes(searchTerm.toLowerCase())));
    } else {
      setFilteredBlogs(blogs);
    }
  }, [searchTerm, blogs]);

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
          <div className="flex">
            {categories.map(category => (
              <button
                key={category}
                className={`mr-4 px-4 py-2 rounded-full text-sm font-medium focus:outline-none ${category === selectedCategory ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog) => (
            <div key={blog.Bid} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <a href={`/Blogs/${blog.Burl}`} >
                <img className="w-full h-64 object-cover rounded-t-lg" src={blog.Bimage} alt="Blog" />
              </a>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">{blog.Bname}</h2>
                <div className="flex items-center text-gray-700 text-sm mb-4">
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
                    <img className="h-10 w-10 rounded-full object-cover" src={blog.BauthorImage} alt="Author" />
                    <span className="ml-3 text-sm font-medium text-gray-900">{blog.Bauthor}</span>
                    <span className="ml-3 text-sm font-medium text-gray-900"><FontAwesomeIcon icon={faEye} className="mr-1" />{blog.Bviews}</span>
                  </div>
                  <a href={`/Blogs/${blog.Burl}`} className="inline-block bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-full text-sm transition-colors duration-300">
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
