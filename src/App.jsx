import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import PortfolioGrid from './components/PortfolioGrid';
import Services from './components/Services';
import Process from './components/Process';
import PriceCalculator from './components/PriceCalculator';
import DesignExplorer from './components/DesignExplorer';
import MaterialShowcase from './components/MaterialShowcase';
import Showcase from './components/Showcase';
import Categories from './components/Categories';
import Blog from './components/Blog';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName.toLowerCase() === 'button' ||
        target.tagName.toLowerCase() === 'a' ||
        target.closest('button') ||
        target.closest('a')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Tiny solid dot that instantly follows the cursor */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-accent rounded-full pointer-events-none z-[9999] hidden lg:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      {/* Larger glowing ring that trails smoothly with spring physics */}
      <motion.div
        className={`fixed top-0 left-0 rounded-full border pointer-events-none z-[9998] hidden lg:flex items-center justify-center transition-all duration-300 ease-out ${
          isHovering 
            ? 'w-14 h-14 bg-accent/20 border-accent/80 backdrop-blur-[2px]' 
            : 'w-8 h-8 bg-transparent border-accent/50'
        }`}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </>
  );
};

function App() {
  return (
    <div className="min-h-screen bg-primary text-text-main transition-colors duration-500 overflow-x-hidden cursor-none relative">
      <CustomCursor />
      
      {/* Global WhatsApp Action Node */}
      <a 
        href="https://wa.me/919999999999" 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[9000] bg-[#25D366] text-[#ffffff] w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(37,211,102,0.4)] hover:scale-110 hover:-translate-y-2 transition-all duration-300 group cursor-pointer"
        aria-label="Direct Chat via WhatsApp"
        style={{ pointerEvents: 'auto' }}
      >
        <MessageCircle fill="currentColor" stroke="none" size={28} className="md:w-8 md:h-8 text-white group-hover:scale-110 transition-transform" />
      </a>

      <Navbar />
      <Hero />
      <TrustBar />
      <Categories />
      <Services />
      <PortfolioGrid />
      <DesignExplorer />
      <Process />
      <PriceCalculator />
      <MaterialShowcase />
      <Showcase />
      <Blog />
      <Testimonials />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
