import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import "./App.css";
import Footer from "./components/headerfooter/footer";
import Header from "./components/headerfooter/header";
import Homepage from "./components/home/homepage";
import Volunteer from "./components/volunteer/volunteer";
import Application from "./components/application/application";
// import NotFoundPage from './components/notfoundpage';
import Chatbot from "./components/Chatbot";
import Auth from "./components/Auth";
import Admin from "./components/admin/adminapp.jsx";
import { Navigate } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/application" element={<Application />} />
        <Route path="/login" element={<Auth />} />
        {/* <Route path="/*" element={<NotFoundPage />} /> */}
        <Route path="/admin/*" element={<Admin />} />
        <Route
          path="/admin"
          element={<Navigate to="/admin/UserList" replace={true} />}
        />
      </Routes>
      <Chatbot />
      <Footer />
    </Router>
  );
}

export default App;
