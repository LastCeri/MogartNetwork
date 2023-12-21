import React from 'react';
import Header from '../../MogartBase/ThemeParts/MainPart/Header/HeaderPart';
import Navbar from '../../MogartBase/ThemeParts/MainPart/Navbar/Navbar';

const newsItems = [
  {
    id: 1,
    title: "Innovative SocialFi Platforms",
    description: "Exploring the impact of decentralized finance on social networks.",
    imageUrl: "https://via.placeholder.com/150"
  },
  {
    id: 2,
    title: "Mina Protocol Updates",
    description: "Latest updates and features in the Mina Protocol.",
    imageUrl: "https://via.placeholder.com/150"
  },
];

const Global: React.FC = () => {
    return (
      <>
        <Header />
        <Navbar />
        <div className="flex flex-col min-h-screen bg-gray-100">
          <div className="flex flex-1">
            <aside className="w-1/4 bg-white p-4 border-r">
            </aside>
            <main className="flex-1 p-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Special News</h2>
              <div className="space-y-4">
                {newsItems.map(newsItem => (
                  <div key={newsItem.id} className="p-4 bg-white rounded shadow">
                    <img src={newsItem.imageUrl} alt={newsItem.title} className="w-full h-64 object-cover rounded mb-4"/>
                    <h3 className="text-xl font-semibold mb-2">{newsItem.title}</h3>
                    <p>{newsItem.description}</p>
                  </div>
                ))}
              </div>
            </main>
            <aside className="w-1/4 bg-white p-4 border-l">
            </aside>
          </div>
        </div>
      </>
    );
};

export default Global;
