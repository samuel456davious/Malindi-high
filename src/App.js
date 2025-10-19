// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./coponents/home/Home";
import Classroom from "./coponents/Classroom/Classroom";
import Contact from "./coponents/Contact/Contact";
import About from "./coponents/About/About";
import Footer from "./coponents/Footer/Footer";
import Navigation from "./coponents/home/Navigation";
import Catholic from "./coponents/Chaplaincy/Catholic";
import Islamic from "./coponents/Chaplaincy/Islamic";
import Chaplaincy from "./coponents/Chaplaincy/Chaplaincy";
import SDA from "./coponents/Chaplaincy/SDA";

const App = () => {
  return (
    <Router>
      <Navigation/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/classroom" element={<Classroom />} />
        <Route path="/contacts" element={<Contact/>} />
        <Route path="/about-us" element={<About/>} />
        <Route path="/chaplaincy/catholic" element={<Catholic />} />
        <Route path="/chaplaincy/islamic" element={<Islamic />} />
         <Route path="/chaplaincy" element={<Chaplaincy />} />
         <Route path="/chaplaincy/sda" element={<SDA />} />
        <Route path="/footer" element={<Footer/>}/>
      </Routes>
      <Footer/>
    </Router>
    
  );
};

export default App;
