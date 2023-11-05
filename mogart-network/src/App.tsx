import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/home.tsx';
import About from './Pages/About/about.tsx';
import AdminPanel from './AdminBase/Admin/AdminPanel';
import Groups from './Pages/Groups/GroupsPage.tsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/Mogartadmin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;
