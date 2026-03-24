import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import PortfolioGrid from '../components/PortfolioGrid';
import Services from '../components/Services';
import Showcase from '../components/Showcase';
import Testimonials from '../components/Testimonials';
import About from '../components/About';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen bg-primary text-text-dark">
      <Navbar />
      <main>
        <Hero />
        <PortfolioGrid />
        <Services />
        <Showcase />
        <Testimonials />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
