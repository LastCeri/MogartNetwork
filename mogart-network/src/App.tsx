import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/home.tsx';
import About from './Pages/About/about.tsx';
import Groups from './Pages/Groups/GroupsPage.tsx';
import Login from './Pages/Login/LoginPage.tsx';
import Profile from './Pages/Profile/Profile.tsx';
import Register from './Pages/Register/RegisterPage.tsx';
import Blogpage from './Pages/Blog/BlogPage.tsx';
import BlogDetail from './MogartBase/Details/BlogDetails/BlogDetail.tsx';
import PostDetail from './MogartBase/Details/PostDetail/PostDetail.tsx';
import SettingsPage from './Pages/Settings/SettingsPage.tsx';
import MessagePage from './Pages/Message/MessagePage.tsx';
import NotificationsPage from './Pages/Notifications/NotificationsPage.tsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Groups" element={<Groups />} />
        <Route path="/Blog" element={<Blogpage />} />

        <Route path="/Profile" element={<Profile />} />
        <Route path="/Message" element={<MessagePage />} />
        <Route path="/Notifications" element={<NotificationsPage />} />
        
        <Route path="/Settings" element={<SettingsPage />} />

        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />

        <Route path="/Blogs/:blogurl" element={<BlogDetail />} />
        <Route path="/Posts/:posturl" element={<PostDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
