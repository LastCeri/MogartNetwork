import React from 'react';
import Header from '../MogartBase/ThemeParts/MainPart/Header/HeaderPart';
import PopUp from '../MogartBase/ThemeParts/Inpart/Menus/PopupMenu/PopupMenu';
import CreatePost from '../MogartBase/ThemeParts/Inpart/PostArea/CreatePostArea/CreatePostArea';
import PostContent from '../MogartBase/ThemeParts/Inpart/PostArea/PostContent/PostContent';
import SearchBox from '../MogartBase/ThemeParts/Inpart/SearchBox/SearchBox';

function Home() {
  return (
    <div>
      <Header />
      <PopUp />
      <CreatePost />
      <PostContent />
    </div>
  );
}

export default Home;