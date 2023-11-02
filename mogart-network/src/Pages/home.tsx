import React from 'react';
import Header from '../MogartBase/ThemeParts/MainPart/Header/HeaderPart';
import PopUp from '../MogartBase/ThemeParts/Inpart/Menus/PopupMenu/PopupMenu';
import CreatePost from '../MogartBase/ThemeParts/Inpart/PostArea/CreatePostArea/CreatePostArea';
import PostContent from '../MogartBase/ThemeParts/Inpart/PostArea/PostContent/PostContent';
import SearchBox from '../MogartBase/ThemeParts/Inpart/SearchBox/SearchBox';
import Groups from '../MogartBase/ThemeParts/Inpart/Groups/Groups';

function Home() {
  return (
    <div>
      <Header />
      <PopUp />
      <CreatePost />
      <PostContent />
      <SearchBox />
      <Groups />
    </div>
  );
}

export default Home;