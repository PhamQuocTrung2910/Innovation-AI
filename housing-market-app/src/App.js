import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import HomePage from './components/Home/HomePage';
import TeamPage from './components/Home/TeamPage';
import About from './components/About/AboutPage';
import Predict from './components/Predict/Predict';

function ScrollToTopOnMount() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page on component mount or route change
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <div>
        <Header />
        <ScrollToTopOnMount /> {/* This will ensure the page loads from the top on each route */}

        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              <div>
                <HomePage />
                <TeamPage />
              </div>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/predict" element={<Predict />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;