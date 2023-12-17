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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Groups" element={<Groups />} />
        <Route path="/Blog" element={<Blogpage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Blogs/:blogurl" element={<BlogDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
