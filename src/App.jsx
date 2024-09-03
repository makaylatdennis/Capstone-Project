import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import "./App.css";
import Footer from "./components/headerfooter/footer";
import Header from './components/headerfooter/header';
import Homepage from './components/home/homepage';
import Volunteer from "./components/volunteer/volunteer";
import Application from "./components/application/application";
// import NotFoundPage from './components/notfoundpage';
// import Chatbot from "./components/Chatbot";
import Auth from "./components/Auth";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/application" element={<Application />} />
        <Route path="/Auth" element={<Auth />} />
        {/* <Route path="/*" element={<NotFoundPage />} /> */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;


