import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';

const categories = ['All', 'Marble', 'Wood Veneers', 'Metals', 'Textures'];

const materials = [
  { id: 1, cat: 'Marble', name: 'Calacatta Gold', img: '/assets/images/WhatsApp Image 2025-02-28 at 20.30.31_2bd3e7e5.jpg' },
  { id: 2, cat: 'Wood Veneers', name: 'Smoked Oak', img: '/assets/images/WhatsApp Image 2025-02-28 at 20.30.28_73b5f9ce.jpg' },
  { id: 3, cat: 'Textures', name: 'Limewash Plaster', img: '/assets/images/WhatsApp Image 2025-02-28 at 20.30.29_d062dc96.jpg' },
  { id: 4, cat: 'Metals', name: 'Aged Brass', img: '/assets/images/WhatsApp Image 2025-02-28 at 20.30.31_2bd3e7e5.jpg' },
  { id: 5, cat: 'Marble', name: 'Nero Marquina', img: '/assets/images/WhatsApp Image 2025-02-28 at 20.30.28_73b5f9ce.jpg' },
  { id: 6, cat: 'Wood Veneers', name: 'Fluted Walnut', img: '/assets/images/WhatsApp Image 2025-02-28 at 20.30.29_d062dc96.jpg' },
];

const MaterialShowcase = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxData, setLightboxData] = useState(null);

  const filteredMaterials = activeFilter === 'All'
    ? materials
    : materials.filter(m => m.cat === activeFilter);

  return (
    <section id="materials" className="py-32 px-6 md:px-20 bg-surface transition-colors duration-500 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-text-main/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <div className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] mb-6">Sourcing & Finishes</div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-text-main tracking-tight transition-colors">Material Showcase</h2>
            <p className="text-text-muted text-xl font-light transition-colors">Interact with our exclusive catalog of imported, premium-grade materials utilized across our highest tier projects.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-2"
          >
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-5 py-2.5 rounded-xl text-[11px] font-bold tracking-widest uppercase transition-all duration-300 border ${
                  activeFilter === cat 
                    ? 'bg-accent/10 text-accent border-accent shadow-sm' 
                    : 'bg-transparent text-text-muted border-border hover:border-text-main/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredMaterials.map((mat) => (
              <motion.div
                key={mat.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                onClick={() => setLightboxData(mat)}
                className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer border border-border shadow-lg"
              >
                <img src={mat.img} alt={mat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125" />
                <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                  <ZoomIn className="text-text-main shrink-0" size={32} />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Triggered State */}
      <AnimatePresence>
        {lightboxData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99999] bg-primary/95 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <button 
              onClick={() => setLightboxData(null)}
              className="absolute top-8 right-8 w-14 h-14 bg-surface rounded-full flex items-center justify-center border border-border text-text-main hover:bg-accent hover:text-primary transition-all shadow-2xl z-50"
            >
              <X size={24} />
            </button>
            
            <motion.div 
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-5xl w-full aspect-video md:aspect-[21/9] rounded-[2rem] overflow-hidden shadow-[0_0_100px_rgba(var(--accent),0.2)]"
            >
              <img src={lightboxData.img} alt={lightboxData.name} className="w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-10 pt-32">
                <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] mb-2 block">{lightboxData.cat}</span>
                <h3 className="text-4xl font-bold text-white tracking-tight">{lightboxData.name}</h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default MaterialShowcase;
