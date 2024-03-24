import React, { useState, useEffect } from 'react';
import Header from '../../MogartBase/ThemeParts/MainPart/Header/HeaderPart';
import Navbar from '../../MogartBase/ThemeParts/MainPart/Navbar/Navbar';
import { API_URL } from '../../MogartBase/Api/Api';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface SearchResultItem {
  ScID: string;
  ScType: string;
  ScName: string;
  ScImage: string;
}

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResultItem[]>([]);
  const navigate = useNavigate();

  const handleSearch = (e: any) => {
    e.preventDefault();
  };

  useEffect(() => {
    axios.get(`${API_URL}/GetSearch`)
      .then(response => {
        if (response.status === 200) {
          const data = response.data;
          setSearchResults(data);
        } else {
          console.error("Error Response:", response.status);
        }
      })
      .catch(error => {
        if (error.code === "ERR_NETWORK") {
          console.error('Network error:', error);
          navigate('/NetworkError');
        } else if (error.response) {
          console.error('Chat data fetching failed:', error.response.data);
        } else {
          console.error('Error:', error.message);
        }
      });
  }, []);
  

  return (
    <>
      <Header />
      <Navbar />
      <div className="flex flex-col h-screen pt-16">
        <main className="flex-1 p-4">
          <div className="max-w-7xl mx-auto mt-12">
            <div className="relative w-full">
              <input
                type="text"
                className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1111.196 3.667l4.607 4.608a1 1 0 01-1.414 1.414l-4.607-4.607A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
              {searchResults.map((item, index) => (
                <div
                  key={item.ScID}
                  className="rounded-lg overflow-hidden shadow-lg transition duration-300 ease-in-out hover:shadow-2xl bg-white"
                >
                  <img src={item.ScImage} alt={item.ScName} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h5 className="font-semibold text-lg text-gray-800">{item.ScName}</h5>
                    <p className="text-sm text-gray-600 mt-1">{item.ScType}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default SearchPage;
