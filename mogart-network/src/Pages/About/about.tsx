import React from 'react';
import Header from '../../MogartBase/ThemeParts/MainPart/Header/HeaderPart';
import Navbar from '../../MogartBase/ThemeParts/MainPart/Navbar/Navbar';

function About() {
  return (
    <>
      <Header />
      <Navbar />
      <div className="flex flex-col h-screen">
       <main className="flex-1 flex justify-center items-center p-4 bg-gray-100">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold text-gray-700 mb-4">Welcome to the Mogart Network</h1>
            <p className="text-gray-600 mb-4">Welcome to the Mogart Network, a cutting-edge SocialFi platform built on top of the Mina Protocol. Our platform is designed to foster a vibrant community where users engage, share, and display content in various forms. Whether it's through developer documentation, podcasts, product promotions, or competitive tournaments, we are here to revolutionize the way users connect and interact online.</p>
            
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Features</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li><strong>Content Creation and Sharing:</strong> A space for users to bring their creativity to life and share with a broad audience.</li>
              <li><strong>Developer Documentation:</strong> A repository of knowledge for developers to contribute and collaborate on projects.</li>
              <li><strong>Podcasting:</strong> A seamless auditory platform for sharing insights, stories, and entertainment.</li>
              <li><strong>Project and Product Promotion:</strong> A launchpad for showcasing innovative ideas and products.</li>
              <li><strong>Events:</strong> Regular events designed to promote social learning and networking.</li>
              <li><strong>Tournament Games:</strong> A battleground for hosting competitive and thrilling gaming tournaments.</li>
              <li>And Many More Features: Stay tuned as we continue to expand our platform with new and exciting features.</li>
            </ul>
          </div>
        </main>
      </div>
    </>
  );
}

export default About;
