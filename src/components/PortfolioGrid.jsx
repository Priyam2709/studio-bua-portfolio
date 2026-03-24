import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import { projects } from '../data/projects';
import ProjectModal from './ProjectModal';
import { useModal } from '../hooks/useModal';

const categories = ['all', 'living', 'kitchen', 'bedroom', 'bathroom'];

const ProjectImage = ({ project, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <div 
      className="relative aspect-[4/3] overflow-hidden cursor-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      onClick={onClick}
    >
      <img 
        src={project.images[0]} 
        alt={project.title}
        className={`w-full h-full object-cover transition-transform duration-[1.5s] ease-out ${isHovered ? 'scale-110' : 'scale-100'}`}
      />
      <div className={`absolute inset-0 bg-black/40 transition-opacity duration-700 pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
      
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.2 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.2 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            style={{ x: mouseX, y: mouseY }}
            className="absolute top-0 left-0 -ml-[45px] -mt-[45px] w-[90px] h-[90px] bg-accent/90 backdrop-blur-md rounded-full flex items-center justify-center pointer-events-none z-50 text-white font-bold text-[10px] tracking-widest uppercase shadow-2xl mix-blend-normal"
          >
            Explore
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const PortfolioGrid = () => {
  const [filter, setFilter] = useState('all');
  const { isOpen, activeData, openModal, closeModal } = useModal();

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-32 px-6 md:px-20 bg-primary transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl"
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-text-main tracking-tight transition-colors">Selected Works</h2>
            <p className="text-text-muted text-xl font-light transition-colors">Explore our latest transformative designs with highly interactive local cursors.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-wrap gap-3"
          >
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-3 rounded-full text-xs font-bold tracking-widest transition-all duration-300 capitalize border ${
                  filter === cat 
                    ? 'bg-accent text-primary border-accent shadow-[0_0_15px_rgba(var(--accent),0.4)] scale-105' 
                    : 'bg-transparent text-text-muted border-border hover:border-accent hover:text-text-main'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                className="group relative rounded-[2rem] overflow-hidden bg-surface border border-border hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/10 transition-all duration-500 cursor-default"
              >
                <ProjectImage project={project} onClick={() => openModal(project)} />
                <div className="p-8">
                  <span className="text-xs font-bold uppercase tracking-wider text-accent mb-3 block">
                    {project.category}
                  </span>
                  <h3 className="text-2xl font-bold text-text-main tracking-wide transition-colors group-hover:text-accent duration-500">{project.title}</h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <ProjectModal 
        isOpen={isOpen} 
        onClose={closeModal} 
        project={activeData} 
      />
    </section>
  );
};
export default PortfolioGrid;
