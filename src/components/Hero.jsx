import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const titleWords = "Elevating Spaces, Enriching Lives".split(" ");

  return (
    <section ref={ref} id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-primary transition-colors duration-500">
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0 w-full h-full pointer-events-none">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover scale-[1.05]"
        >
          <source src="/assets/images/vid1.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-primary/70 backdrop-blur-[4px] transition-colors duration-500" />
      </motion.div>

      <div className="relative z-10 text-center px-6 max-w-7xl mx-auto pt-24 mt-16 text-text-main">
        <motion.div
           initial={{ opacity: 0, scale: 0.8 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1, type: "spring", stiffness: 100, delay: 0.1 }}
           className="inline-block mb-10 px-6 py-3 border border-border rounded-full backdrop-blur-md bg-surface/80 text-accent font-bold tracking-[0.2em] uppercase text-sm shadow-xl transition-colors duration-500 hover:scale-105 hover:bg-surface cursor-default"
        >
          Exclusive Design Studio
        </motion.div>
        
        <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-bold text-text-main leading-[1.1] mb-10 tracking-tight transition-colors duration-500 flex flex-wrap justify-center gap-x-6 gap-y-2">
          {titleWords.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 50, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.8, delay: 0.2 + i * 0.15, type: "spring", stiffness: 80 }}
              className={`inline-block origin-bottom ${word === 'Enriching' || word === 'Lives' ? 'text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600' : ''}`}
            >
              {word}
            </motion.span>
          ))}
        </h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-2xl md:text-3xl text-text-muted mb-16 max-w-4xl mx-auto font-light leading-relaxed transition-colors duration-500"
        >
          We create timeless, functional, and deeply personal interiors that reflect who you are and how you want to live.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 1, type: "spring", stiffness: 100 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <motion.a 
            href="#projects" 
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center bg-accent text-primary px-12 py-6 rounded-2xl font-bold transition-all w-full sm:w-auto shadow-[0_15px_30px_rgba(var(--accent),0.2)] text-xl hover:bg-text-main hover:text-primary hover:shadow-[0_20px_40px_rgba(var(--accent),0.4)]"
          >
            Explore Portfolio
          </motion.a>
          <motion.a 
            href="#services" 
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center border-2 border-border bg-surface/50 text-text-main px-12 py-6 rounded-2xl font-bold backdrop-blur-md transition-all w-full sm:w-auto text-xl shadow-xl hover:bg-surface hover:border-accent hover:shadow-[0_20px_40px_rgba(var(--accent),0.2)]"
          >
            Our Methodology
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
