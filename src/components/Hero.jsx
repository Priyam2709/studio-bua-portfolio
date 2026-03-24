import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

const backgrounds = [
  { id: 1, type: 'video', src: '/assets/images/vid1.mp4' },
  { id: 2, type: 'image', src: '/assets/images/WhatsApp Image 2025-02-28 at 20.30.28_73b5f9ce.jpg' },
  { id: 3, type: 'image', src: '/assets/images/WhatsApp Image 2025-02-28 at 20.30.29_d062dc96.jpg' }
];

const Hero = () => {
  const ref = useRef(null);
  const [currentBg, setCurrentBg] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  // Cycle Media Slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgrounds.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const titleWords = "Transforming Spaces Into Experiences".split(" ");

  return (
    <section ref={ref} id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-primary transition-colors duration-500">
      
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0 w-full h-full pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBg}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            {backgrounds[currentBg].type === 'video' ? (
              <video autoPlay loop muted playsInline className="w-full h-full object-cover scale-[1.05]">
                <source src={backgrounds[currentBg].src} type="video/mp4" />
              </video>
            ) : (
              <img src={backgrounds[currentBg].src} alt="Portfolio Slider" className="w-full h-full object-cover" />
            )}
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 bg-primary/70 backdrop-blur-[2px] transition-colors duration-500" />
      </motion.div>

      <div className="relative z-10 text-center px-6 max-w-7xl mx-auto pt-24 mt-16 text-text-main">
        <motion.div
           initial={{ opacity: 0, scale: 0.8 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1, type: "spring", stiffness: 100, delay: 0.1 }}
           className="inline-block mb-8 px-6 py-3 border border-border rounded-full backdrop-blur-md bg-surface/80 text-accent font-bold tracking-[0.2em] uppercase text-xs shadow-xl transition-colors duration-500 cursor-default"
        >
          Premium Interior Design
        </motion.div>
        
        <h1 className="text-5xl md:text-7xl lg:text-[6.5rem] font-bold text-text-main leading-[1.1] mb-10 tracking-tight transition-colors duration-500 flex flex-wrap justify-center gap-x-5 gap-y-2">
          {titleWords.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 50, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.8, delay: 0.2 + i * 0.15, type: "spring", stiffness: 80 }}
              className={`inline-block origin-bottom ${word === 'Experiences' ? 'text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600' : ''}`}
            >
              {word}
            </motion.span>
          ))}
        </h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-xl md:text-2xl text-text-muted mb-16 max-w-3xl mx-auto font-light leading-relaxed transition-colors duration-500"
        >
          We create timeless, functional, and deeply personal interiors optimized for luxury living and seamless conversion.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 1, type: "spring", stiffness: 100 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <motion.a 
            href="#calculator" 
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center bg-accent text-primary px-10 py-5 rounded-2xl font-bold transition-all w-full sm:w-auto shadow-[0_15px_30px_rgba(var(--accent),0.2)] text-lg hover:bg-text-main hover:text-primary hover:shadow-[0_20px_40px_rgba(var(--accent),0.4)]"
          >
            Get Free Estimate
          </motion.a>
          <motion.a 
            href="#explorer" 
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center border-2 border-border bg-surface/50 text-text-main px-10 py-5 rounded-2xl font-bold backdrop-blur-md transition-all w-full sm:w-auto text-lg shadow-xl hover:bg-surface hover:border-accent hover:shadow-[0_20px_40px_rgba(var(--accent),0.2)]"
          >
            Explore Designs
          </motion.a>
        </motion.div>
      </div>
      
      {/* Slider Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {backgrounds.map((_, idx) => (
          <button 
            key={idx}
            onClick={() => setCurrentBg(idx)}
            className={`transition-all duration-500 rounded-full ${currentBg === idx ? 'w-10 h-2 bg-accent' : 'w-2 h-2 bg-text-muted/50 hover:bg-text-muted'}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
