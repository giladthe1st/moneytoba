import './App.css';
// import {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import { useState } from 'react';

// Import components
import Navbar from './components/navbar';

// Import pages
import Home from './components/home';
import Login from './components/login';
import Register from './components/register';
import Explore from './components/explore';
import Neighbourhoods from './components/neighbourhoods';

//google api key AIzaSyCaSp4GgGVBJpyNnfpOMfIPerJIsoMerWA
function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/neighborhoods" element={<Neighbourhoods />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
