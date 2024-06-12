// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Matches from './pages/Matches';
import MatchDetails from './components/MatchDetails';
import TeamDetails from './pages/TeamDetails';
import News from './pages/News';
import Navbar from './components/Navbar';
import Standings from './pages/Standings';

import './css/App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Matches />} />
          <Route path="/match/:id" element={<MatchDetails />} />
          <Route path='/team/:id' element={<TeamDetails />} />
          <Route path="/news" element={<News />} />
          <Route path="/standings" element={<Standings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;