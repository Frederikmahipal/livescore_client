import * as React from 'react';
import { useState } from 'react';
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Matches from "./pages/Matches";
import MatchDetails from "./components/MatchDetails";

import News from "./pages/News";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { AuthProvider } from "./services/Authcontext";

function App() {

  return (
    <ChakraProvider>
      <AuthProvider>
        <Router>
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/" element={<Matches />} />
              <Route path="/match/:id" element={<MatchDetails />} />

              <Route path="/news" element={<News />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </Router>
        </AuthProvider > 
    </ChakraProvider>
  );
}

export default App;