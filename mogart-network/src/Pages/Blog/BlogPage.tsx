import React, { useState, useEffect } from 'react';

import PopUp from '../../MogartBase/ThemeParts/Inpart/PopupMenu/PopupMenu';
import GlobalPage from '../../MogartBase/ThemeParts/Inpart/Blog/BlogPage';

const Blog: React.FC = () => {
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
                <GlobalPage />
            </main>
            <aside className="Main-Content-Right">

            </aside>
          </div>
        </div>
      );
};

export default Blog;
