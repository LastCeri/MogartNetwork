import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/home';
import About from './Pages/About/about.tsx';
import Signin from './Pages/sing-in';
import Register from './Pages/register';
import AdminPanel from './AdminBase/Admin/AdminPanel';
import Uipanel from './Ui';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sing-in" element={<Signin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Mogartadmin" element={<AdminPanel />} />
        <Route path="/Ui" element={<Uipanel />} />
      </Routes>
    </Router>
  );
}

export default App;
