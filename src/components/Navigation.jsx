import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const Navigation = () => {
  return (
    <nav className="site-nav">
      <Link to="/splash" className="nav-home">
        <Home size={24} />
        <span>Back to Home</span>
      </Link>
    </nav>
  );
};

export default Navigation; 