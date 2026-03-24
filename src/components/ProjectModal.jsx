import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Layers, Maximize2 } from 'lucide-react';

const BeforeAfterSlider = ({ before, after }) => {
  const [sliderPos, setSliderPos] = useState(50);

  return (
    <div className="relative w-full aspect-square md:aspect-[21/9] rounded-[2rem] overflow-hidden cursor-ew-resize group shadow-[0_0_50px_rgba(var(--accent),0.1)] border border-border mt-12">
      {/* After Image */}
      <img src={after} alt="After" className="absolute inset-0 w-full h-full object-cover" />
      
      {/* Before Image Filtered & Clipped */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      >
        <img src={before} alt="Before" className="absolute inset-0 w-full h-full object-cover grayscale-[40%] contrast-75 blur-[1px]" />
      </div>

      {/* Scrubber Line */}
      <div 
        className="absolute top-0 bottom-0 w-1 md:w-1.5 bg-accent cursor-ew-resize flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.8)]"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="w-10 h-10 md:w-12 md:h-12 bg-surface rounded-full shadow-2xl flex items-center justify-center pointer-events-none border-2 border-accent text-accent">
          <ChevronLeft size={18} className="-mr-1" /><ChevronRight size={18} className="-ml-1" />
        </div>
      </div>
      
      {/* Interactive Range Input */}
      <input 
        type="range" 
        min="0" max="100" 
        value={sliderPos}
        onChange={(e) => setSliderPos(e.target.value)}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize m-0 p-0"
      />
      
      {/* Dynamic Labels */}
      <div className="absolute bottom-6 left-6 bg-surface/80 text-text-main backdrop-blur-md px-4 py-2 text-[10px] font-bold tracking-widest uppercase rounded-full pointer-events-none shadow-xl border border-border transition-all duration-300" style={{ opacity: sliderPos > 20 ? 1 : 0 }}>
        Original State
      </div>
      <div className="absolute bottom-6 right-6 bg-accent text-primary backdrop-blur-md px-4 py-2 text-[10px] font-bold tracking-widest uppercase rounded-full pointer-events-none shadow-xl transition-all duration-300" style={{ opacity: sliderPos < 80 ? 1 : 0 }}>
        Transformed
      </div>
    </div>
  )
};

const ProjectModal = ({ isOpen, onClose, project }) => {
  // Lock scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-primary/95 backdrop-blur-2xl p-0 md:p-6"
        >
          {/* Close Button Trigger */}
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 md:top-8 md:right-10 w-14 h-14 bg-surface rounded-full flex items-center justify-center border border-border text-text-main hover:bg-accent hover:text-primary transition-all shadow-2xl z-50 hover:scale-110"
          >
            <X size={24} />
          </button>

          {/* Modal Content Payload */}
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full h-full md:h-auto max-h-[100vh] md:max-h-[90vh] max-w-7xl bg-surface md:rounded-[2.5rem] overflow-y-auto shadow-2xl border-x-0 md:border border-border relative overscroll-none scrollbar-hide"
          >
            
            {/* Header Massive Cover */}
            <div className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden group">
              <img 
                src={project.after || project.images[0]} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
              
              <div className="absolute bottom-0 left-0 p-8 md:p-16 w-full">
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                  <span className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">{project.category}</span>
                  <h2 className="text-5xl md:text-7xl font-bold text-text-main tracking-tighter mb-4">{project.title}</h2>
                </motion.div>
              </div>
            </div>

            {/* Content Body Grid */}
            <div className="p-8 md:p-16">
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                {/* Description Column */}
                <div className="lg:col-span-2">
                  <div className="flex items-center gap-4 mb-8">
                    <Layers className="text-accent" size={28} />
                    <h3 className="text-3xl font-bold text-text-main">Project Overview</h3>
                  </div>
                  <p className="text-text-muted text-xl font-light leading-relaxed mb-12">
                    {project.description}
                  </p>

                  {/* Materials Module */}
                  {project.materials && (
                    <div className="mb-12">
                      <h4 className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-text-main to-text-muted uppercase tracking-widest mb-6 border-b border-border pb-4">Primary Sourcing</h4>
                      <div className="flex flex-wrap gap-3">
                        {project.materials.map(mat => (
                          <span key={mat} className="px-5 py-2.5 rounded-xl border border-border bg-surface text-text-main font-bold text-xs tracking-wider shadow-sm flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                            {mat}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                </div>

                {/* Scope Sidebar */}
                <div className="lg:col-span-1 border-l-0 lg:border-l border-border pl-0 lg:pl-16">
                  <h4 className="text-sm font-bold text-text-main uppercase tracking-widest mb-8 border-b border-border pb-4">Scope Matrix</h4>
                  <ul className="space-y-6">
                    <li className="flex justify-between items-center border-b border-border/50 pb-4">
                      <span className="text-text-muted uppercase tracking-wider text-xs font-bold">Client</span>
                      <span className="text-text-main font-bold">Studio Bua Internal</span>
                    </li>
                    <li className="flex justify-between items-center border-b border-border/50 pb-4">
                      <span className="text-text-muted uppercase tracking-wider text-xs font-bold">Timeline</span>
                      <span className="text-text-main font-bold">8 Weeks</span>
                    </li>
                    <li className="flex justify-between items-center border-b border-border/50 pb-4">
                      <span className="text-text-muted uppercase tracking-wider text-xs font-bold">Zone</span>
                      <span className="text-text-main font-bold capitalize">{project.category}</span>
                    </li>
                  </ul>

                  <a href="#calculator" onClick={onClose} className="mt-12 w-full py-5 bg-accent text-primary rounded-xl font-bold uppercase tracking-widest text-xs tracking-wider shadow-[0_15px_30px_rgba(var(--accent),0.2)] hover:bg-text-main hover:shadow-[0_20px_40px_rgba(var(--accent),0.4)] hover:-translate-y-1 transition-all flex items-center justify-center">
                    Estimate Similar Project
                  </a>
                </div>
              </div>

              {/* Advanced Before/After Slider Core Feature */}
              {project.before && project.after && (
                <div className="mt-16 pt-16 border-t border-border">
                  <div className="flex items-center gap-4 mb-4">
                    <Maximize2 className="text-accent" size={28} />
                    <h3 className="text-3xl font-bold text-text-main">The Transformation</h3>
                  </div>
                  <p className="text-text-muted text-lg font-light mb-8 max-w-3xl">Drag the slider to visually evaluate the comprehensive architectural changes executed during the renovation logic.</p>
                  
                  <BeforeAfterSlider before={project.before} after={project.after} />
                </div>
              )}

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
