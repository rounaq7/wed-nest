import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Splash from './components/Splash';
import SplashPage from './components/SplashPage';
import Selection from './components/SelectionPage';
import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import ForgotPassword from './components/ForgotPassword';
import VenueSection from './components/VenueSection';
import WeddingCalendarSection from './components/WeddingCalendarSection';
import TestimonialsSection from './components/TestimonialsSection';

function App() {
  return (
    <Router>
      <Routes>
        {/* Initial loading splash screen */}
        <Route path="/" element={<Splash />} />
        
        {/* Main splash page with content */}
        <Route path="/splash" element={<SplashPage />} />
        
        {/* New section routes */}
        <Route path="/venues" element={<VenueSection />} />
        <Route path="/calendar" element={<WeddingCalendarSection />} />
        <Route path="/testimonials" element={<TestimonialsSection />} />
        
        {/* Existing routes */}
        <Route path="/selection" element={<Selection />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
      </Routes>
    </Router>
  );
}

export default App;