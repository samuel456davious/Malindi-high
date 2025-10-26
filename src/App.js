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
import ProtectedRoute from "./coponents/Authentication/ProtectedRoute";
import { AuthProvider } from "./coponents/Authentication/AuthContext";
import Login from "./coponents/Authentication/Login"
import Dashboard from "./coponents/Secretary/Dashboard"
import PendingUsers from "./coponents/Secretary/PendingUsers";
import Register from "./coponents/Authentication/Register";
import ApproveUser from "./coponents/Secretary/ApproveUser";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contacts" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/chaplaincy" element={<Chaplaincy />} />
          <Route path="/chaplaincy/catholic" element={<Catholic />} />
          <Route path="/chaplaincy/islamic" element={<Islamic />} />
          <Route path="/chaplaincy/sda" element={<SDA />} />
          <Route path="/pending_users" element={<PendingUsers/>}/>
          <Route path="/approve" element={<ApproveUser/>}/>
          <Route path="/register" element={<Register/>}/>

          {/* ✅ Protected route example */}
          <Route path="/classroom" element={<ProtectedRoute> <Classroom />  </ProtectedRoute> }/>
          <Route path="/dashboard" element={<ProtectedRoute> <Dashboard />  </ProtectedRoute> }/>

          {/* Optional: handle 404s */}
          <Route path="*" element={<h2>404 - Page Not Found</h2>} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;
