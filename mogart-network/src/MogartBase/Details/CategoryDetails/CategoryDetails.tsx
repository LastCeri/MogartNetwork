import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../../../MogartBase/ThemeParts/MainPart/Header/HeaderPart';
import Navbar from '../../../MogartBase/ThemeParts/MainPart/Navbar/Navbar';
import { API_URL } from '../../Api/Api';
import { useData } from '../../../MogartBase/Context/DataContext.tsx';

interface ContentItem {
  ID: string;
  type: string;
  content: string;
  desc: string;
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
  Desc: string;
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
        const filteredData = response.data.filter(item => item.PostID || item.PostID);
        const formattedContent = filteredData.map(({ PostID, PostType,Desc, PostContent, Category, PostTags, PostAuthor, PostDate, PostAuthorAvatar, PostImage }) => ({
          ID: (PostID).toString(),
          type: PostType,
          content: PostContent,
          Category,
          tags: PostTags ? PostTags.split(',') : [],
          author: PostAuthor,
          desc:Desc,
          date: PostDate,
          authorAvatar: PostAuthorAvatar,
          image: PostImage
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
      <CategoryButtons categories={['Blog', 'Post']} setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} />
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
  <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6">
    {content.map((item, index) => (
      <ContentItemDisplay key={item.ID + index} item={item} />
    ))}
  </div>
);

interface ContentItemDisplayProps {
  item: ContentItem;
}

const ContentItemDisplay: React.FC<ContentItemDisplayProps> = ({ item }) => (
  <div className="relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300 ease-in-out">
    {item.type === 'image' && (
      <>
        <img src={item.image} alt="Content" className="w-full h-64 object-cover transition-transform duration-500 ease-in-out hover:scale-110" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
          <p className="text-white text-lg font-bold truncate">{item.author}</p>
        </div>
      </>
    )}

    {item.type === 'text' && (
      <div className="p-6">
        <a href={`/${item.Category.toUpperCase()}S/${item.ID}`}><p className="text-lg font-semibold text-gray-800 leading-tight">{item.content}</p></a>
        <CatList cats={item.tags} />
      </div>
    )}

    {item.type === 'video' && (
      <>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent to-transparent p-4">
          <p className="text-white text-lg font-bold truncate">{item.author}</p>
        </div>
      </>
    )}

    <div className="p-6">
      <div className="text-xs text-gray-500 mt-4 flex items-center">
        <img src={item.authorAvatar} alt="Author Avatar" className="w-10 h-10 rounded-full object-cover mr-3 shadow" />
        <div>
          <p className="font-semibold text-gray-700">{item.author}</p>
          <p className="text-gray-400">{item.date}</p>
        </div>
      </div>
    </div>
  </div>
);

interface TagListProps {
  cats: string[];
}

const CatList: React.FC<TagListProps> = ({ cats }) => (
  <div className="mt-6 flex flex-wrap">
  {cats.map(cat => (
  <span key={cat} className="inline-block">
  <a href={`/tags/${cat}`}
     className="cursor-pointer px-5 py-2.5 leading-none text-black rounded-full text-sm mb-3 mr-3 shadow-md hover:shadow-lg transition duration-200 ease-in-out transform hover:scale-110 flex items-center justify-center">
     <span className="text-slate-800">#</span>
    <span className="rounded-full px-2 mr-2"> {cat} </span>
  </a>
</span>
))}
</div>
);


export default CategoryDetails;