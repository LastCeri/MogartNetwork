import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../../../MogartBase/ThemeParts/MainPart/Header/HeaderPart';
import Navbar from '../../../MogartBase/ThemeParts/MainPart/Navbar/Navbar';
import { API_URL } from '../../Api/Api';

interface ContentItem {
  id: number;
  type: string;
  content: string;
  category: string;
  tags: string[];
}

const TaggedContentPage: React.FC = () => {
  const { tagname } = useParams<{ tagname: string }>(); 
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [tagNames, setTagNames] = useState<string[]>([]); 
  const [allContent, setAllContent] = useState<ContentItem[]>([]);

  const categories = ['Blog', 'Post'];

  interface ApiResponse {
    id: number;
    type: string;
    content: string;
    category: string;
    tags: string[];
  }

  const fetchTagNames = async () => {
    try {
      const response = await axios.get(`${API_URL}/GetTags/${tagname}`);
      setTagNames(response.data);
    } catch (error) {
      console.error('Error fetching tag names:', error);
    }
  };

  useEffect(() => {
    fetchTagNames();
  }, []); 

  const filteredContent = allContent.filter((item) => {
    const isCategoryMatch = selectedCategory ? item.category === selectedCategory : true;
    const isTagMatch = tagname === 'All' || (tagname && item.tags.includes(tagname));
  
    return isCategoryMatch && isTagMatch;
  });

  return (
    <>
      <Header />
      <Navbar />
      <div className="flex flex-col min-h-screen bg-gray-100 mt-20">
        <main className="flex-1 flex flex-col items-center p-4">
          <div className="w-full max-w-3xl mb-4">
            <div className="flex space-x-4">
              <button
                className={`text-sm px-4 py-2 rounded-md ${selectedCategory === null ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                onClick={() => setSelectedCategory(null)}
              >
                All
              </button>
              {categories.map(category => (
                <button
                  key={category}
                  className={`text-sm px-4 py-2 rounded-md ${selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          <div className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
            {filteredContent.map(item => (
              <div key={item.id} className="bg-white border border-gray-200 rounded-md overflow-hidden shadow-md">
                {item.type === 'text' && <p className="text-sm text-gray-700 p-4">{item.content}</p>}
                {item.type === 'image' && <img src={item.content} alt="Content" className="w-full h-48 object-cover rounded-t-md" />}
                <div className="flex justify-between items-center p-4">
                  <div className="flex space-x-2 items-center">
                    {item.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-blue-500 text-white rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
};

export default TaggedContentPage;
