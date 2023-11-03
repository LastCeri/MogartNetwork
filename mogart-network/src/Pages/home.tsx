import React from 'react';
import Header from '../MogartBase/ThemeParts/MainPart/Header/HeaderPart';
import PopUp from '../MogartBase/ThemeParts/Inpart/Menus/PopupMenu/PopupMenu';
import CreatePost from '../MogartBase/ThemeParts/Inpart/PostArea/CreatePostArea/CreatePostArea';
import PostContent from '../MogartBase/ThemeParts/Inpart/PostArea/PostContent/PostContent';
import SearchBox from '../MogartBase/ThemeParts/Inpart/SearchBox/SearchBox';
import Groups from '../MogartBase/ThemeParts/Inpart/Groups/Groups';
import RightBar from '../MogartBase/ThemeParts/Inpart/Right-Bar/RightBar';
import SecondaryBar from '../MogartBase/ThemeParts/Inpart/SecondaryBar/SecondaryBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

function Home() {
  return (
    <div>
      <Header />
      <PopUp />
      <CreatePost />
      <PostContent />
      <RightBar />
      <SecondaryBar />
    </div>
  );
}

export default Home;