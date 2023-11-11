import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/home.tsx';
import About from './Pages/About/about.tsx';
import Groups from './Pages/Groups/GroupsPage.tsx';
import Login from './Pages/Login/LoginPage.tsx';
import Signin from './Pages/Sign-in/SignPage.tsx';
import Blogpage from './Pages/Blog/BlogPage.tsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/blog" element={<Blogpage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Sign" element={<Signin />} />
      </Routes>
    </Router>
  );
}

export default App;
