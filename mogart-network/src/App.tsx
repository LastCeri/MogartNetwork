import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import HomePage from './Pages/Home/HomePage.tsx';
import AboutPage from './Pages/About/About.tsx';

import GroupsPage from './Pages/Groups/GroupsPage.tsx';
import CreateGroupPage from './Pages/Groups/SubPage/CreateGroups/CreateGroupsPage.tsx';
import LoginPage from './Pages/Login/LoginPage.tsx';
import ProfilePage from './Pages/Profile/Profile.tsx';
import RegisterPage from './Pages/Register/RegisterPage.tsx';
import BlogPage from './Pages/Blog/BlogPage.tsx';
import BlogDetail from './MogartBase/Details/BlogDetails/BlogDetail.tsx';
import PostDetail from './MogartBase/Details/PostDetail/PostDetail.tsx';
import TagsDetail from './MogartBase/Details/TagsDetails/TagsDetails.tsx';
import GroupDetail from './MogartBase/Details/GroupsDetails/GroupDetail.tsx';
import SettingsPage from './Pages/Settings/SettingsPage.tsx';
import MessagePage from './Pages/Message/MessagePage.tsx';
import NotificationsPage from './Pages/Notifications/NotificationsPage.tsx';
import ActivityPage from './Pages/Activity/ActivityPage.tsx';
import GlobalPage from './Pages/Global/GlobalPage.tsx';
import SearchPage from './Pages/Search/SearchPage.tsx';

import NotFoundPage from './Pages/ErrorPages/404/404.tsx';
import ServerErrorPage from './Pages/ErrorPages/500/500.tsx';
import ForbiddenPage from './Pages/ErrorPages/403/403.tsx';
import CategoryDetails from './MogartBase/Details/CategoryDetails/CategoryDetails.tsx';
import LostPasswordPage from './Pages/LostPassword/LostPasswordPage.tsx';
import CommunicationPage from './Pages/Communication/CommunicationPage.tsx';
import ERR_NETWORKPage from './Pages/ErrorPages/Server/ERR_NETWORK.tsx';
import AuthorDetail from './MogartBase/Details/AuthorDetails/AuthorDetail.tsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/About" element={<AboutPage />} />
        <Route path="/Groups" element={<GroupsPage />} />
        <Route path="/Groups/:groupname" element={<GroupDetail />} />
        <Route path="/Groups/CreateGroups" element={<CreateGroupPage />} />
        <Route path="/Blogs" element={<BlogPage />} />
        <Route path="/Global" element={<GlobalPage />} />
        <Route path="/Profile" element={<ProfilePage />} />

        <Route path="/Messages" element={<MessagePage />} />
        <Route path="/Messages/:username" element={<MessagePage />} />
        <Route path=":username/Notifications" element={<NotificationsPage />} />
        <Route path=":username/Activity" element={<ActivityPage />} />
        <Route path="/Settings" element={<SettingsPage />} />
        <Route path="/Search" element={<SearchPage />} />

        <Route path="/Communication" element={<CommunicationPage />} />
        <Route path="/Com" element={<CommunicationPage />} />
        
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/Register" element={<RegisterPage />} />

        <Route path="/Profile/:username" element={<ProfilePage />} />
        <Route path="/Blogs/:author" element={<AuthorDetail />} />
        <Route path="/Blogs/:author/:blogurl" element={<BlogDetail />} />
        <Route path="/Posts/:posturl" element={<PostDetail />} />
        <Route path="/Tags/:tagname" element={<TagsDetail />} />
        <Route path="/Category/:catname" element={<CategoryDetails />} />

        <Route path="/404" element={<NotFoundPage />} />
        <Route path="/403" element={<ForbiddenPage  />} />
        <Route path="/500" element={<ServerErrorPage/>} />
        <Route path="/NetworkError" element={<ERR_NETWORKPage/>} />
        <Route path="/LostPassword" element={<LostPasswordPage/>} />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
