import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar";
import Hero from "./Components/Hero/Hero";
import About from "./Components/About/About";
import Services from "./Components/Services/Services";
import Projects from "./Components/Projects/Projects";
import Contact from "./Components/Contact/Contact";
import Footer from "./Components/Footer/Footer";
import Dashboard from "./Components/Admin/Dashboard";
import ProtectedRoute from "./Components/Admin/ProtectedRoute";
import Login from "./Components/Admin/Login.jsx";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">

      <Routes>
        {/* Public Website */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Hero />
              <About />
              <Services />
              <Projects />
              <Contact />
              <Footer />
            </>
          }
        />

        {/* Admin Login */}
        <Route path="/admin" element={<Login />} />

        {/* Admin Dashboard */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>

    </div>
  );
}

export default App;
