import React from 'react';
import Header from '../../MogartBase/ThemeParts/MainPart/Header/HeaderPart';
import Navbar from '../../MogartBase/ThemeParts/MainPart/Navbar/Navbar';


const blogs = [
  {
    id: 1,
    title: 'What is an Online Community? The Basics & Benefits',
    excerpt: 'There’s a huge range in how an online community can scale, and understanding what type of...',
    author: 'MogartNetwork',
    tags: ['COMMUNITIES'],
    imageUrl: 'your-image-link.jpg',
  },
  {
    id: 2,
    title: 'A new era for international associations – there is no turning',
    excerpt: 'There’s a huge range in how an online community can scale, and understanding what type of...',
    author: 'MogartNetwork',
    tags: ['COMMUNITY'],
    imageUrl: 'your-image-link.jpg',
  },
];

const Blog: React.FC = () => {
  return (
    <>
      <Header />
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {blogs.map((blog) => (
            <div key={blog.id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <img className="w-full h-48 object-cover" src={blog.imageUrl} alt="Blog" />
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-2">{blog.title}</h2>
                <p className="text-gray-700 mb-4">{blog.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-semibold">{blog.author}</span>
                    {blog.tags.map((tag) => (
                      <span key={tag} className="ml-2 bg-gray-200 text-sm px-2 py-1 rounded-full">{tag}</span>
                    ))}
                  </div>
                  <a href="#" className="text-blue-600 hover:underline text-sm">
                    READ MORE →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Blog;
