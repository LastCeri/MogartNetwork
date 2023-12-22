import React, { useState } from 'react';
import Header from '../../../MogartBase/ThemeParts/MainPart/Header/HeaderPart';
import Navbar from '../../../MogartBase/ThemeParts/MainPart/Navbar/Navbar';


const allContent = [
  { id: 1, type: 'text', content: 'Exploring the beauty of nature', tags: ['Nature', 'Photography'] },
  { id: 2, type: 'image', content: 'https://via.placeholder.com/150', tags: ['Art', 'Design', 'Photography'] },
];

const TaggedContentPage: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<string>('Photography');
  const filteredContent = allContent.filter(item => item.tags.includes(selectedTag));

  return (
    <>
      <Header />
      <Navbar />
      <div className="flex flex-col h-screen pt-[heightOfHeaderAndNavbar]"> {/* Adjust top padding */}
        <main className="flex-1 flex justify-center items-center overflow-y-auto bg-gray-100">
          <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold text-gray-700 mb-4">Content Tagged: {selectedTag}</h1>

            <div className="space-y-4">
              {filteredContent.map(item => (
                <div key={item.id} className="p-4 bg-gray-50 rounded-md">
                  {item.type === 'text' && <p className="text-sm text-gray-600">{item.content}</p>}
                  {item.type === 'image' && <img src={item.content} alt="Content" className="w-full h-auto rounded" />}
                  <div className="flex space-x-2 mt-2">
                    {item.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-blue-200 text-blue-800 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
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

export default TaggedContentPage;
