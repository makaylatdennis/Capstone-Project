import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Homepage from './components/homepage';
// import NotFoundPage from './components/notfoundpage';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        {/* <Route path="/*" element={<NotFoundPage />} /> */}
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;

