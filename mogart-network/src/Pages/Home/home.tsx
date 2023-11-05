import React from 'react';
import PopUp from '../../MogartBase/ThemeParts/Inpart/PopupMenu/PopupMenu';
import CreatePost from '../../MogartBase/ThemeParts/Inpart/PostArea/CreatePostArea/CreatePostArea';
import PostContent from '../../MogartBase/ThemeParts/Inpart/PostArea/PostContent/PostContent';
import RightBar from '../../MogartBase/ThemeParts/Inpart/Right-Bar/RightBar';
import './home.css';

function Home() {
  return (
        <div className="Main-Container">
          <header className="Main-Header">
          <div className="header">
            <span className="social-score">Social Score</span>
            <span className="title">Mogart Network</span>
            <button className="menu-btn">...</button>
            </div>
          </header>
          <div className="Main-Content">
            <aside className="Main-Content-Left">
              <nav>
              <PopUp />
              </nav>
            </aside>
            <main className="Main-Content-Center">
                <CreatePost />
                <PostContent />
            </main>
            <aside className="Main-Content-Right">
                <RightBar />
            </aside>
          </div>
        </div>
      );
}

export default Home;