import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Footer from './components/Footer';
import RegisterComplaint from './components/RegisterComplaint'; // Import RegisterComplaint
import IPCSectionsTable from './components/Learn_IPC';
import LawPage from './components/LawPage'; // Import LawPage component
import AboutUs from './components/About';
import ComplaintHistory from './components/ComplaintHistory';
import HelpSupportWidget from './components/HelpSupportWidget';
import './App.css';

function App() {
  const branches = ['Civil', 'Patent', 'Criminal', 'Family Law', 'Labour Law', 'More'];

  return (
    <Router>
      <Navbar branches={branches} />
      <Routes>
        {/* Home Page */}
        <Route path="/" element={
          <>
            <Hero />
            <Features />
            <Footer />
            <HelpSupportWidget />
          </>
        }/>
        
        
        {/* Register Complaint Page */}
        
        <Route path="/:lawId" element={
          <>
            <LawPage />
            <HelpSupportWidget />
          </>
        } />

        <Route path="/register-complaint" element={
          <>
            <RegisterComplaint />
            <HelpSupportWidget />
          </>
        } />
        <Route path="/complaint-history" element={
          <>
            <ComplaintHistory />
            <HelpSupportWidget />
          </>
        } />
        <Route path="/IPCSections" element={
          <>
            <IPCSectionsTable />
            <HelpSupportWidget />
          </>
        } />
        <Route path="/about" element={
          <>
            <AboutUs />
            <HelpSupportWidget />
          </>
        } />

      </Routes>
    </Router>
  );
}

export default App;
