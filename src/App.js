import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import About from './components/About';
import Home from './components/Home';
import Dashboard from './components/Dashboard';


const App = () => {
 

  return (
    <Router>
      <div>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        
      </div>
    </Router>
  );
};

export default App;
