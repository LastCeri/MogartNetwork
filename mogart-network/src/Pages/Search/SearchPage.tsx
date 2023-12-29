// SearchPage.tsx
import React, { useState, useEffect } from 'react';
import Header from '../../MogartBase/ThemeParts/MainPart/Header/HeaderPart';
import Navbar from '../../MogartBase/ThemeParts/MainPart/Navbar/Navbar';

interface SearchResultItem {
    type: string;
    title: string;
    imageUrl: string;
  }

const popularSearches = [
  { type: 'Image', title: 'Nature', imageUrl: 'https://example.com/nature.jpg' },
  { type: 'Icon', title: 'Heart', imageUrl: 'https://example.com/heart.jpg' },
  { type: 'Video', title: 'Cities', imageUrl: 'https://example.com/cities.jpg' },
  { type: 'Video', title: 'Cities', imageUrl: 'https://example.com/cities.jpg' },
  { type: 'Video', title: 'Cities', imageUrl: 'https://example.com/cities.jpg' },
  { type: 'Video', title: 'Cities', imageUrl: 'https://example.com/cities.jpg' },
  { type: 'Video', title: 'Cities', imageUrl: 'https://example.com/cities.jpg' },
  { type: 'Video', title: 'Cities', imageUrl: 'https://example.com/cities.jpg' },
  { type: 'Video', title: 'Cities', imageUrl: 'https://example.com/cities.jpg' },

];

const fetchSearchResults = (query:any) => {
    if (!query) return [];
  
    return [
      { type: 'Image', title: 'Nature', imageUrl: 'https://example.com/nature.jpg' },
      { type: 'Icon', title: 'Heart', imageUrl: 'https://example.com/heart.jpg' },
      { type: 'Video', title: 'Cities', imageUrl: 'https://example.com/cities.jpg' },
    ];
  };

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResultItem[]>([]);
  
  
  const handleSearch = (e:any) => {
    e.preventDefault();
  };
  
  useEffect(() => {
    const results = fetchSearchResults(searchTerm);
    setSearchResults(results);
  }, [searchTerm]);


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
                    <div key={index} className="rounded-md overflow-hidden shadow-lg transition duration-300 ease-in-out hover:shadow-2xl">
                    <img src={item.imageUrl} alt={item.title} className="w-full h-auto" />
                    <div className="p-2">
                        <h5 className="font-semibold">{item.title}</h5>
                        <p className="text-sm text-gray-600">{item.type}</p>
                    </div>
                    </div>
                ))}
                </div>

                <div className="grid grid-cols-3 gap-4 mt-8">
                    {popularSearches.map((item, index) => (
                        <div key={index} className="rounded-md overflow-hidden shadow-lg transition duration-300 ease-in-out hover:shadow-2xl">
                        <img src={item.imageUrl} alt={item.title} className="w-full h-auto" />
                        <div className="p-2">
                            <h5 className="font-semibold">{item.title}</h5>
                            <p className="text-sm text-gray-600">{item.type}</p>
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
