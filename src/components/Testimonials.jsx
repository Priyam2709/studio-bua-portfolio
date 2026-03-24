import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    quote: "They didn't just design our house, they changed how we live in it. Every corner is functional and painfully beautiful.",
    name: "Sarah Jenkins",
    type: "Residential Renovation"
  },
  {
    id: 2,
    quote: "The attention to detail and material selection is unparalleled. They delivered exactly what was promised and more.",
    name: "Marcus Thorne",
    type: "Luxury Villa"
  },
  {
    id: 3,
    quote: "A seamless process from concept to execution. We trusted their vision completely, and the result is magnificent.",
    name: "Elena Rostova",
    type: "Boutique Hotel"
  }
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-32 px-6 md:px-20 bg-primary overflow-hidden relative border-t border-b border-border transition-colors duration-500">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[300px] bg-accent/5 blur-[100px] pointer-events-none" />
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <Quote className="text-accent/20 w-20 h-20 md:w-24 md:h-24 mx-auto mb-10" />
        
        <div className="h-[250px] md:h-[200px] flex items-center justify-center relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute w-full px-4"
            >
              <p className="text-2xl md:text-3xl lg:text-4xl text-text-main font-serif italic mb-10 leading-relaxed tracking-wide transition-colors">
                "{testimonials[index].quote}"
              </p>
              <div>
                <h4 className="font-bold text-xl text-text-main tracking-wide mb-1 transition-colors">{testimonials[index].name}</h4>
                <span className="text-accent/70 text-xs font-bold uppercase tracking-widest">{testimonials[index].type}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-6 mt-16 relative z-10">
          <button 
            onClick={prev}
             className="w-14 h-14 rounded-full border border-border flex items-center justify-center text-text-main hover:bg-text-main hover:text-primary hover:border-text-main hover:scale-110 transition-all duration-300"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={next}
             className="w-14 h-14 rounded-full border border-border flex items-center justify-center text-text-main hover:bg-text-main hover:text-primary hover:border-text-main hover:scale-110 transition-all duration-300"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};
export default Testimonials;
