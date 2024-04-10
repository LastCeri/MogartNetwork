import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../../../MogartBase/ThemeParts/MainPart/Header/HeaderPart';
import Navbar from '../../../MogartBase/ThemeParts/MainPart/Navbar/Navbar';
import { API_URL } from '../../Api/Api';
import { useData } from '../../../MogartBase/Context/DataContext.tsx';

interface ContentItem {
  ID: string;
  name:string;
  type: string;
  content: string;
  desc: string;
  Category: string;
  tags: string[];
  author: string;
  date: string;
  authorAvatar: string;
  image:string;
  url:string;
}

interface ApiResponseItem {
  BlogID: string;
  BlogName: string;
  BlogAuthor: string;
  BlogAuthorAvatar: string;
  BlogContent: string;
  BlogDate: string;
  BlogImage: string;
  BlogTags: string;
  BlogUrl: string;
  BlogDesc:string;
  BlogViews: string;
  Category: string;
}

const CategoryDetails: React.FC = () => {
  const { catname } = useParams<{ catname: string }>();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [allContent, setAllContent] = useState<ContentItem[]>([]);
  const [filteredContent, setFilteredContent] = useState<ContentItem[]>([]);
  const { isLoading } = useData();

  useEffect(() => {
    if (isLoading || !catname) return;
    
    const fetchCategoryNames = async () => {
      try {
        const response = await axios.get<ApiResponseItem[]>(`${API_URL}/GetDetailCategory/${catname}`);
        const filteredData = response.data.filter(item => item.BlogID);
        const formattedContent = filteredData.map(({ BlogID, BlogName,Category, BlogDesc, BlogContent, BlogTags, BlogAuthor, BlogDate, BlogAuthorAvatar, BlogImage,BlogUrl }) => ({
          ID: BlogID,
          type: Category,
          content: BlogContent,
          Category,
          tags: BlogTags ? [] : [],
          author: BlogAuthor,
          desc:BlogDesc,
          date: BlogDate,
          authorAvatar: BlogAuthorAvatar,
          image: BlogImage,
          name: BlogName,
          url: BlogUrl
        }));
        setAllContent(formattedContent);
        setFilteredContent(formattedContent);
      } catch (error) {
        console.error('Error fetching category names:', error);
      }
    };
    
    fetchCategoryNames();
  }, [catname, isLoading]);

  useEffect(() => {
    const filtered = allContent.filter(item => selectedCategory === null || item.Category.toLowerCase() === selectedCategory.toLowerCase());
    setFilteredContent(filtered);
  }, [selectedCategory, allContent]);

  return (
    <>
      <Header />
      <Navbar />
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <CategoryButtons categories={['Blog']} setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} />
          <main className="flex-1 flex flex-col items-center p-4">
              {filteredContent.length > 0 ? (
                <ContentGrid content={filteredContent} />
              ) : (
                <div className="text-gray-600">
                  <p className="bg-gray-100 shadow-lg rounded-lg p-4" >There are no posts of type {selectedCategory} belonging to this category.</p>
                </div>
              )}
            </main>
      </div>
    </>
  );
};

interface CategoryButtonsProps {
  categories: string[];
  setSelectedCategory: (category: string | null) => void;
  selectedCategory: string | null;
}

const CategoryButtons: React.FC<CategoryButtonsProps> = ({ categories, setSelectedCategory, selectedCategory }) => (
  <div className="flex justify-center items-center max-w-7xl mx-auto mt-20 my-8 bg-gray-100 shadow-xl rounded-xl p-4">
    <div className="flex space-x-2">
      <button
        className={`text-sm px-4 py-2 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-600 ${
          selectedCategory === null ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg' : 'bg-gray-200 text-gray-700 hover:shadow-md'
        }`}
        onClick={() => setSelectedCategory(null)}
      >
        All
      </button>
      {categories.map(category => (
        <button
          key={category}
          className={`text-sm px-4 py-2 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 ${
            selectedCategory === category ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg' : 'bg-gray-200 text-gray-700 hover:shadow-md hover:bg-gray-300'
          }`}
          onClick={() => setSelectedCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  </div>
);

interface ContentGridProps {
  content: ContentItem[];
}

const ContentGrid: React.FC<ContentGridProps> = ({ content }) => (
  <div className="w-full max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-8">
    {content.map((item, index) => (
      <ContentItemDisplay key={item.ID + index} item={item} />
    ))}
  </div>
);

interface ContentItemDisplayProps {
  item: ContentItem;
}

const ContentItemDisplay: React.FC<ContentItemDisplayProps> = ({ item }) => (
  <a href={`/Blogs/${item.author.replace(' ','')}/${item.url}`}>
  <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-row">
    <img src={item.image} alt="Content" className="w-1/2 h-auto object-cover transition-transform duration-500 ease-in-out hover:scale-110" />
    <div className="p-4 flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold">{item.name}</h3>
        <p className="text-sm text-gray-500">{item.desc}</p>
      </div>
      <div className="text-xs text-gray-500 mt-2 flex items-center">
        <img src={item.authorAvatar} alt="Author Avatar" className="w-8 h-8 rounded-full object-cover mr-2" />
        <div>
          <p className="font-semibold text-gray-700">{item.author}</p>
          <p className="text-gray-400">{item.date}</p>
        </div>
      </div>
    </div>
  </div>
  </a>
);

export default CategoryDetails;