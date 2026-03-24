import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const showcaseData = [
  {
    id: 'wall',
    title: 'Textural Walls',
    desc: 'Bespoke wall treatments using raw, organic materials that catch the light beautifully and create profound depth in any room.',
    img: '/assets/images/WhatsApp Image 2025-02-28 at 20.30.28_73b5f9ce.jpg'
  },
  {
    id: 'ceiling',
    title: 'Architectural Ceilings',
    desc: 'We treat the ceiling as the fifth wall, implementing structural beams, dramatic molding, and ambient cove lighting.',
    img: '/assets/images/WhatsApp Image 2025-02-28 at 20.30.29_d062dc96.jpg'
  },
  {
    id: 'lighting',
    title: 'Curated Illumination',
    desc: 'Lighting is the jewelry of the space. We source rare, sculptural fixtures that act as focal points both day and night.',
    img: '/assets/images/WhatsApp Image 2025-02-28 at 20.30.31_2bd3e7e5.jpg'
  }
];

const Showcase = () => {
  const [activeTab, setActiveTab] = useState('wall');
  const activeData = showcaseData.find(d => d.id === activeTab);

  return (
    <section className="py-32 px-6 md:px-20 bg-surface transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-text-main tracking-tight transition-colors">Signature Elements</h2>
            <p className="text-text-muted text-xl font-light transition-colors">Discover the defining characteristics of our architectural approach.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-wrap gap-2 p-2 bg-primary/50 backdrop-blur-md rounded-2xl border border-border">
              {showcaseData.map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative px-6 py-3 rounded-xl text-sm font-bold tracking-widest transition-colors duration-300 uppercase z-10 ${
                    activeTab === item.id ? 'text-primary' : 'text-text-muted hover:text-text-main'
                  }`}
                >
                  {activeTab === item.id && (
                    <motion.div 
                      layoutId="showcaseTab"
                      className="absolute inset-0 bg-accent rounded-xl -z-10 shadow-lg"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                  {item.title}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-1/2 aspect-square lg:aspect-[4/5] relative rounded-[2.5rem] overflow-hidden bg-primary shadow-2xl border border-border group"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={activeData.id}
                src={activeData.img}
                initial={{ opacity: 0, filter: 'blur(20px)', scale: 1.1 }}
                animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
                exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.05 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 w-full h-full object-cover origin-center transition-transform duration-[2s] group-hover:scale-110"
                alt={activeData.title}
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
          </motion.div>

          <div className="w-full lg:w-1/2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeData.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="text-accent font-bold uppercase tracking-[0.3em] text-xs mb-6 flex items-center">
                  <span className="w-8 h-[1px] bg-accent mr-4"></span>
                  Detail Focus
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-text-main mb-6 tracking-wide transition-colors group-hover:text-accent duration-500">{activeData.title}</h3>
                <p className="text-text-muted text-xl font-light leading-relaxed mb-10 transition-colors">
                  {activeData.desc}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
};
export default Showcase;
