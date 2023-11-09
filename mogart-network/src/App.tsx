import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/home.tsx';
import About from './Pages/About/about.tsx';
import AdminPanel from './AdminBase/Admin/AdminPanel';
import Groups from './Pages/Groups/GroupsPage.tsx';
import Login from './Pages/Login/LoginPage.tsx';
import Signin from './Pages/Sign-in/SignPage.tsx';
import Global from './Pages/Global/GlobalPage.tsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/global" element={<Global />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Sign" element={<Signin />} />
        <Route path="/Mogartadmin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;
