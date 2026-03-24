import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const ProjectModal = ({ isOpen, onClose, project }) => {
  const [sliderPos, setSliderPos] = useState(50);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-8 bg-black/80 backdrop-blur-md"
        >
          <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

          <motion.div
            initial={{ y: 100, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full h-full md:h-auto max-w-7xl bg-surface md:rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row shadow-2xl z-10 md:max-h-[90vh] border border-white/10"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 z-50 p-3 bg-black/40 hover:bg-black/80 text-white backdrop-blur-md rounded-full transition-colors border border-white/10"
            >
              <X size={20} />
            </button>

            {/* Left: Before/After Slider */}
            <div className="w-full md:w-[60%] h-[50vh] md:h-auto min-h-[400px] relative overflow-hidden bg-black group select-none flex-shrink-0">
              <div 
                className="absolute inset-0 w-full h-full"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
                  setSliderPos((x / rect.width) * 100);
                }}
                onTouchMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const touch = e.touches[0];
                  const x = Math.max(0, Math.min(touch.clientX - rect.left, rect.width));
                  setSliderPos((x / rect.width) * 100);
                }}
              >
                <img src={project.after} alt="After" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute top-6 right-6 bg-black/80 text-white px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase border border-white/20 backdrop-blur-sm">After</div>

                <div 
                  className="absolute inset-0 w-full h-full overflow-hidden"
                  style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
                >
                  <img src={project.before} alt="Before" className="absolute inset-0 w-full h-full object-cover filter grayscale-[30%] opacity-80" />
                  <div className="absolute top-6 left-6 bg-black/80 text-white px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase border border-white/20 backdrop-blur-sm">Before</div>
                </div>

                <div 
                  className="absolute top-0 bottom-0 w-1 bg-accent cursor-ew-resize flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.5)]"
                  style={{ left: `${sliderPos}%` }}
                >
                  <div className="w-12 h-12 bg-accent text-primary rounded-full flex items-center justify-center shadow-lg transform -translate-x-1/2 cursor-grab active:cursor-grabbing border-4 border-black group-hover:scale-110 transition-transform duration-300">
                    <ChevronLeft size={16} className="-mr-1" strokeWidth={3} />
                    <ChevronRight size={16} className="-ml-1" strokeWidth={3} />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Info */}
            <div className="w-full md:w-[40%] p-10 md:p-14 overflow-y-auto bg-surface flex flex-col">
              <span className="text-accent font-bold uppercase tracking-widest text-xs mb-4 block">
                {project.category}
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight tracking-tight">{project.title}</h2>
              
              <p className="text-gray-400 mb-12 leading-relaxed text-lg font-light">
                {project.description}
              </p>

              <div className="mb-12">
                <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-6">Key Materials</h4>
                <div className="flex flex-wrap gap-3">
                  {project.materials.map(mat => (
                    <span key={mat} className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-xs font-bold tracking-wide text-gray-300">
                      {mat}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-auto pt-8 border-t border-white/10">
                 <button className="w-full bg-white text-primary py-5 rounded-full font-bold text-sm tracking-widest uppercase hover:bg-accent hover:-translate-y-1 transform transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                   Discuss Similar Project
                 </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
