import React from "react";
import Volunteer from "./components/volunteer/volunteer";
import Volform from "./components/volunteer/volform";
import Footer from "./components/headerfooter/footer"

import React from "react";
import "./App.css";
import Chatbot from "./components/Chatbot";
import Auth from "./components/Auth";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Homepage from './components/homepage';
// import NotFoundPage from './components/notfoundpage';

function App() {
  return (
    <>
  <Volunteer />
  <Volform />
<Footer />
    </>
          )
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

