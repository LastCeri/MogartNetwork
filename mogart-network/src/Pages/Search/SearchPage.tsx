import React, { useState, useEffect } from 'react';
import Header from '../../MogartBase/ThemeParts/MainPart/Header/HeaderPart';
import Navbar from '../../MogartBase/ThemeParts/MainPart/Navbar/Navbar';
import { API_URL } from '../../MogartBase/Api/Api';
import axios from 'axios';

interface SearchResultItem {
  ScID: string;
  ScType: string;
  ScName: string;
  ScImage: string;
}

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResultItem[]>([]);

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
        console.error("Error GetSearch:", error);
      });
  }, []);
  

  return (
    <>
      <Header />
      <Navbar />
      <div className="flex flex-col h-screen pt-16">
        <main className="flex-1 p-4">
          <div className="max-w-7xl mx-auto mt-12">
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="grid grid-cols-3 gap-4 mt-4">
              {searchResults.map((item, index) => (
                <div
                  key={item.ScID}
                  className="rounded-md overflow-hidden shadow-lg transition duration-300 ease-in-out hover:shadow-2xl"
                >
                  <img src={item.ScImage} alt={item.ScName} className="w-auto h-auto" />
                  <div className="p-2">
                    <h5 className="font-semibold">{item.ScName}</h5>
                    <p className="text-sm text-gray-600">{item.ScType}</p>
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
