import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faEye, faFolderOpen, faSearch } from '@fortawesome/free-solid-svg-icons';
import { API_URL } from '../../MogartBase/Api/Api';
import Header from '../../MogartBase/ThemeParts/MainPart/Header/HeaderPart';
import Navbar from '../../MogartBase/ThemeParts/MainPart/Navbar/Navbar';

interface GlobalContent {
  Bid: number;
  Gname: string;
  Gauthor: string;
  GauthorImage: string;
  Gcategory: string;
  Gcontent: string;
  Gdate: string;
  Gimage: string;
  Gtags: string;
  Gurl: string;
  Gviews: string;
}

const GlobalContentComponent: React.FunctionComponent = () => {
  const [globalContents, setGlobalContents] = useState<GlobalContent[]>([]);
  const [filteredGlobalContents, setFilteredGlobalContents] = useState<GlobalContent[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const apiUrl = `${API_URL}/GetGlobals`;
    axios.get<GlobalContent[]>(apiUrl)
      .then((response) => {
        console.log(response);
        const data = response.data;
        setGlobalContents(data);
        setFilteredGlobalContents(data);
        const uniqueCategories = Array.from(new Set(data.map(global => global.Gcategory)));
        setCategories(uniqueCategories);
      })
      .catch((error) => {
        console.error('Error fetching data from API:', error);
      });
  }, []);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    const filtered = globalContents.filter(global => category === null || category === '' || global.Gcategory === category);
    setFilteredGlobalContents(filtered);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const filtered = globalContents.filter(global => global.Gname.toLowerCase().includes(term.toLowerCase()));
    setFilteredGlobalContents(filtered);
  };

  return (
    <>
      <Header />
      <Navbar />
      <div className="container mx-auto px-4 py-8 mt-12">
        <div className="flex justify-between items-start">
          <aside className="w-1/4 bg-white p-4 border-r rounded-md">
            <h2 className="text-2xl font-semibold mb-4">Categories</h2>
            <ul className="space-y-2">
              <li onClick={() => handleCategoryChange('')} className={`cursor-pointer p-2 rounded-md transition-colors duration-300 hover:bg-gray-200 ${selectedCategory === null ? 'bg-gray-200' : ''}`}>All</li>
              {categories.map(category => (
                <li key={category} onClick={() => handleCategoryChange(category)} className={`cursor-pointer p-2 rounded-md transition-colors duration-300 hover:bg-gray-200 ${selectedCategory === category ? 'bg-gray-200' : ''}`}>{category}</li>
              ))}
            </ul>
            <div className="mt-6">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-colors duration-300"
              />
            </div>
          </aside>
          <main className="flex-1 p-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Special News</h2>
            <div className="grid grid-cols-1 gap-8">
              {filteredGlobalContents.map((global) => (
                <div key={global.Bid} className="bg-white rounded-md shadow-lg overflow-hidden">
                  <img src={global.Gimage} alt={global.Gname} className="w-full h-64 object-cover rounded-t-md"/>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-4">{global.Gname}</h3>
                    <p className="text-gray-700 mb-4">{global.Gcontent}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <img src={global.GauthorImage} alt={global.Gauthor} className="h-10 w-10 rounded-full object-cover"/>
                        <span className="ml-3 text-sm font-medium text-gray-900">{global.Gauthor}</span>
                      </div>
                      <a href={`/Blogs/${global.Gurl}`} className="text-blue-600 hover:underline text-sm">Read More →</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
          <aside className="w-1/4 bg-white p-4 border-l rounded-md">
          </aside>
        </div>
      </div>
    </>
  );
};

export default GlobalContentComponent;
