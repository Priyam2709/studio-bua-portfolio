import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const designStyles = ['All', 'Modern', 'Minimal', 'Luxury', 'Traditional'];

const explorerData = [
  { id: 1, type: 'Modern', img: '/assets/images/WhatsApp Image 2025-02-28 at 20.30.29_d062dc96.jpg', title: 'Open Concept Living' },
  { id: 2, type: 'Minimal', img: '/assets/images/WhatsApp Image 2025-02-28 at 20.30.28_73b5f9ce.jpg', title: 'Monochrome Palette' },
  { id: 3, type: 'Luxury', img: '/assets/images/WhatsApp Image 2025-02-28 at 20.30.31_2bd3e7e5.jpg', title: 'Double Height Features' },
  { id: 4, type: 'Modern', img: '/assets/images/WhatsApp Image 2025-02-28 at 20.30.31_2bd3e7e5.jpg', title: 'Industrial Accents' },
  { id: 5, type: 'Traditional', img: '/assets/images/WhatsApp Image 2025-02-28 at 20.30.28_73b5f9ce.jpg', title: 'Heritage Elements' },
  { id: 6, type: 'Minimal', img: '/assets/images/WhatsApp Image 2025-02-28 at 20.30.29_d062dc96.jpg', title: 'Zen Atmosphere' },
];

const DesignExplorer = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredData = activeFilter === 'All' 
    ? explorerData 
    : explorerData.filter(d => d.type === activeFilter);

  return (
    <section id="explorer" className="py-32 px-6 md:px-20 bg-primary transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] mb-6">Design Inspiration</div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-text-main tracking-tight transition-colors">Ideation Explorer</h2>
          <p className="text-text-muted text-xl font-light transition-colors max-w-2xl">Use our advanced explorer modules to find the exact style blueprint that matches your vision.</p>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {designStyles.map(style => (
            <button
              key={style}
              onClick={() => setActiveFilter(style)}
              className={`px-6 py-3 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 border ${
                activeFilter === style 
                  ? 'bg-text-main text-primary border-text-main shadow-xl scale-105' 
                  : 'bg-transparent text-text-muted border-border hover:border-text-main/50 hover:text-text-main'
              }`}
            >
              {style}
            </button>
          ))}
        </div>

        {/* Dynamic Masonry-ish Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredData.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                className={`relative group overflow-hidden rounded-3xl bg-surface border border-border cursor-pointer ${
                  index === 0 || index === 3 ? 'md:col-span-2 lg:col-span-1 aspect-video lg:aspect-[4/5]' : 'aspect-square'
                }`}
              >
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="absolute bottom-0 left-0 p-8 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="text-[10px] font-bold tracking-[0.2em] text-accent uppercase mb-2 block">{item.type}</span>
                  <h3 className="text-2xl font-bold text-text-main">{item.title}</h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-16 flex justify-center">
          <a href="#calculator" className="px-10 py-5 bg-surface border border-border text-text-main rounded-xl font-bold uppercase tracking-widest text-xs hover:border-accent hover:text-accent transition-all shadow-xl hover:shadow-[0_0_30px_rgba(var(--accent),0.2)]">
            Estimate This Style
          </a>
        </div>
      </div>
    </section>
  );
};

export default DesignExplorer;
