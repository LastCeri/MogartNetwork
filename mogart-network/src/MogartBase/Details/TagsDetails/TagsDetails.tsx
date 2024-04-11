import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../../../MogartBase/ThemeParts/MainPart/Header/HeaderPart';
import Navbar from '../../../MogartBase/ThemeParts/MainPart/Navbar/Navbar';
import { API_URL } from '../../Api/Api';
import { useData } from '../../../MogartBase/Context/DataContext.tsx';

interface ContentItem {
  id: string;
  type: string;
  title:string;
  content: string;
  tags: string[];
  author: string;
  date: string;
  authorAvatar: string;
  image:string;
  url:string
}

interface ApiResponseItem { 
  Type: string;
  PostID: string;
  PostAuthorID: string;
  PostName: string;
  PostTitle: string;
  PostAuthor: string;
  PostAuthorAvatar: string;
  PostImage:string;
  PostContent: string;
  PostDate: string;
  PostDisLike: string;
  PostLike: string;
  PostTags: string;
  PostMentions: string;
  PostPoints: string;
  PostPostCode: string;
  PostSpace: string;
  PostViews: string;
  BlogID: string;
  BlogName: string;
  BlogAuthor: string;
  BlogAuthorAvatar: string;
  BlogCategory: string;
  BlogContent: string;
  BlogDate: string;
  BlogImage: string;
  BlogTags: string;
  BlogUrl: string;
  BlogViews: string;
}

const TaggedContentPage: React.FC = () => {
  const { tagname } = useParams<{ tagname: string }>();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [allContent, setAllContent] = useState<ContentItem[]>([]);
  const [filteredContent, setFilteredContent] = useState<ContentItem[]>([]);
  const { isLoading,siteData } = useData();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading || !tagname) return;
    if(siteData.SiteStatus != "1") navigate('/');

    const fetchTagNames = async () => {
      try {
        const response = await axios.get<ApiResponseItem[]>(`${API_URL}/GetTags/${tagname}`);
        const formattedContent = response.data.map(({
          PostID,
          BlogID,
          BlogName, 
          Type, 
          PostContent, 
          BlogContent, 
          PostTags,
          BlogTags, 
          PostAuthor,
          BlogAuthor, 
          PostDate,
          BlogDate, 
          PostAuthorAvatar,
          BlogAuthorAvatar,
          BlogImage,
          BlogUrl 
        }) => ({
          id: PostID || BlogID,
          type: Type,
          content: PostContent || BlogContent, 
          tags: PostTags ? [] : []|| BlogTags ? [] : [],
          author: PostAuthor|| BlogAuthor,
          date: PostDate || BlogDate,
          authorAvatar: PostAuthorAvatar || BlogAuthorAvatar,
          image: BlogImage,
          title: BlogName,
          url:BlogUrl
        }));
        setAllContent(formattedContent);
        setFilteredContent(formattedContent);
      } catch (error) {
        console.error('Error fetching tag names:', error);
      }
    };

    if(tagname){
      fetchTagNames();
    }
  }, [tagname, isLoading]);

  useEffect(() => {
    const filtered = allContent.filter(item => selectedCategory === null || item.type === selectedCategory);
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
  <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-34 xl:grid-cols-4 gap-6">
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
    <div className="p-6">

      {item.type === 'Blog' && (
        <div className="relative overflow-hidden">
           <a href={`/Blogs/${item.author.replace(' ','')}/${item.url}`}>
            <img src={item.image} alt="Content" className="w-full h-48 object-fit transition-transform duration-500 ease-in-out hover:scale-110" />
           </a>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
              <p className="text-lg font-semibold text-white">{item.title}</p>
            </div>
        </div>
      )}
      
      {item.type === 'Post' && (
        <a href={`/Posts/${item.id}`}>
        <blockquote className="text-lg font-semibold text-gray-800 border-l-4 border-blue-500 pl-4">
          {item.content}
        </blockquote>
        </a>
      )}

      <div className="flex items-center mt-4">
        <img src={item.authorAvatar} alt={`${item.author}'s Avatar`} className="w-10 h-10 rounded-full mr-3" />
        <div>
          <p className="font-semibold text-gray-800">{item.author}</p>
          <p className="text-xs text-gray-500">{item.date}</p>
        </div>
      </div>
    </div>
  </div>
);

export default TaggedContentPage;