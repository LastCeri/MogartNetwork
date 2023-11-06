import React from 'react';
import './About.css';
import Header from '../../MogartBase/ThemeParts/MainPart/Header/HeaderPart';
import RightBar from '../../MogartBase/ThemeParts/Inpart/Right-Bar/RightBar';
import SecondaryBar from '../../MogartBase/ThemeParts/Inpart/SecondaryBar/SecondaryBar';

function About() {
  return (
    <>
      <Header />
      <div className="about-container">
      <div className="about-header">
          <h1>Welcome to the Mogart Network</h1>
        </div>
        <div className="about-content">
          <p>Welcome to the Mogart Network, a cutting-edge SocialFi platform built on top of the Mina Protocol. Our platform is designed to foster a vibrant community where users engage, share, and display content in various forms. Whether it's through developer documentation, podcasts, product promotions, or competitive tournaments, we are here to revolutionize the way users connect and interact online.</p>
          
          <h2>Features</h2>
          <ul className="about-features">
            <li><strong>Content Creation and Sharing:</strong> A space for users to bring their creativity to life and share with a broad audience.</li>
            <li><strong>Developer Documentation:</strong> A repository of knowledge for developers to contribute and collaborate on projects.</li>
            <li><strong>Podcasting:</strong> A seamless auditory platform for sharing insights, stories, and entertainment.</li>
            <li><strong>Project and Product Promotion:</strong> A launchpad for showcasing innovative ideas and products.</li>
            <li><strong>Events:</strong> Regular events designed to promote social learning and networking.</li>
            <li><strong>Tournament Games:</strong> A battleground for hosting competitive and thrilling gaming tournaments.</li>
            <li>And Many More Features: Stay tuned as we continue to expand our platform with new and exciting features.</li>
          </ul>
        </div>
      </div>
      <RightBar />
    </>
  );
}

export default About;
