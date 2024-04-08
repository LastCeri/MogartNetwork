import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../../../MogartBase/ThemeParts/MainPart/Header/HeaderPart';
import Navbar from '../../../MogartBase/ThemeParts/MainPart/Navbar/Navbar';
import { API_URL } from '../../Api/Api';
import { useData } from '../../../MogartBase/Context/DataContext.tsx';

interface ContentItem {
  id: string;
  type: string;
  content: string;
  Category: string;
  tags: string[];
  author: string;
  date: string;
  authorAvatar: string;
  image:string;
}

interface ApiResponseItem {
  PostID: string;
  PostAuthorID: string;
  PostName: string;
  PostTitle: string;
  PostAuthor: string;
  PostAuthorAvatar: string;
  PostCategory: string;
  PostImage:string;
  PostType: string;
  PostContent: string;
  PostDate: string;
  PostDisLike: string;
  PostLike: string;
  PostTags: string;
  PostMentions: string;
  PostPoints: string;
  PostPostCode: string;
  PostSpace: string;
  PostUrl: string;
  PostViews: string;
  Category: string;
}

const TaggedContentPage: React.FC = () => {
  const { tagname } = useParams<{ tagname: string }>();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [allContent, setAllContent] = useState<ContentItem[]>([]);
  const [filteredContent, setFilteredContent] = useState<ContentItem[]>([]);
  const { isLoading } = useData();

  useEffect(() => {
    if (isLoading || !tagname) return;
    
    const fetchTagNames = async () => {
      try {
        const response = await axios.get<ApiResponseItem[]>(`${API_URL}/GetTags/${tagname}`);
        const formattedContent = response.data.map(({ PostID, PostType, PostContent, Category, PostTags, PostAuthor, PostDate, PostAuthorAvatar,PostImage }) => ({
          id: PostID.toString(),
          type: PostType,
          content: PostContent,
          Category,
          tags: PostTags ? PostTags.split(',') : [],
          author: PostAuthor,
          date: PostDate,
          authorAvatar: PostAuthorAvatar,
          image: PostImage
        }));
        setAllContent(formattedContent);
        setFilteredContent(formattedContent);
      } catch (error) {
        console.error('Error fetching tag names:', error);
      }
    };

    fetchTagNames();
  }, [tagname, isLoading]);

  useEffect(() => {
    const filtered = allContent.filter(item => selectedCategory === null || item.Category.toLowerCase() === selectedCategory.toLowerCase());
    setFilteredContent(filtered);
  }, [selectedCategory, allContent]);

  return (
    <>
      <Header />
      <Navbar />
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <CategoryButtons categories={['Blog', 'Post']} setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} />
          <main className="flex-1 flex flex-col items-center p-4">
              {filteredContent.length > 0 ? (
                <ContentGrid content={filteredContent} />
              ) : (
                <div className="text-gray-600">
                  <p className="bg-gray-100 shadow-lg rounded-lg p-4" >There are no posts of type {selectedCategory} belonging to this tag.</p>
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
  <div className="flex justify-center items-center max-w-3xl mx-auto mt-20 my-8 bg-gray-100 shadow-lg rounded-lg p-4">
    <div className="flex space-x-2 overflow-x-auto">
      <button
        className={`text-sm px-4 py-2 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-md ${
          selectedCategory === null ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
        }`}
        onClick={() => setSelectedCategory(null)}
      >
        All
      </button>
      {categories.map(category => (
        <button
          key={category}
          className={`text-sm px-4 py-2 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-md ${
            selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
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
  <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6">
    {content.map((item, index) => (
      <ContentItemDisplay key={item.id + index} item={item} />
    ))}
  </div>
);

interface ContentItemDisplayProps {
  item: ContentItem;
}

const ContentItemDisplay: React.FC<ContentItemDisplayProps> = ({ item }) => (
  <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
    {item.type === 'image' && (
      <>
        <img src={item.image} alt="Content" className="w-full h-48 object-cover transition-transform duration-500 ease-in-out hover:scale-110" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <p className="text-white text-lg font-bold">{item.author}</p>
        </div>
      </>
    )}
    <div className="p-6">
      {item.type === 'text' && (
        <>
          <p className="text-lg font-semibold text-gray-800">{item.content}</p>
        </>
      )}
      <div className="text-xs text-gray-500 mt-4 flex items-center">
        <img src={item.authorAvatar} alt="Author Avatar" className="w-10 h-10 rounded-full mr-3" />
        <div>
          <p className="font-semibold">{item.author}</p>
          <p>{item.date}</p>
        </div>
      </div>
    </div>
  </div>
);



export default TaggedContentPage;