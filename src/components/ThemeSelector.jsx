import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, X } from 'lucide-react';

const themes = [
  { id: 'obsidian', name: 'Obsidian', color: '#0A0A0B', accent: '#D4AF37' },
  { id: 'navy', name: 'Navy', color: '#060B14', accent: '#E5A93C' },
  { id: 'crimson', name: 'Crimson', color: '#12080A', accent: '#F2CC8F' }
];

const ThemeSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('obsidian');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'obsidian';
    setCurrentTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const changeTheme = (id) => {
    setCurrentTheme(id);
    localStorage.setItem('theme', id);
    document.documentElement.setAttribute('data-theme', id);
    setIsOpen(false);
  };

  return (
    <div className="fixed top-1/2 right-6 -translate-y-1/2 z-[99999] opacity-80 hover:opacity-100 transition-opacity">
      <motion.div 
        layout
        className="bg-black/80 backdrop-blur-3xl border border-white/10 p-3 rounded-[2.5rem] flex flex-col items-center gap-3 shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
      >
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`w-12 h-12 rounded-full flex items-center justify-center text-white transition-colors duration-300 shadow-inner ${isOpen ? 'bg-accent text-black' : 'bg-white/10 hover:bg-white/20'}`}
          title="Change Theme"
        >
          {isOpen ? <X size={20} /> : <Palette size={20} />}
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="flex flex-col items-center justify-center gap-4 overflow-hidden pt-2 pb-1"
            >
              {themes.map((theme, idx) => (
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: idx * 0.05 }}
                  key={theme.id}
                  onClick={() => changeTheme(theme.id)}
                  className={`group relative w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center flex-shrink-0 ${
                    currentTheme === theme.id ? 'border-white scale-110 shadow-lg' : 'border-transparent hover:border-white/50 hover:scale-105'
                  }`}
                  style={{ backgroundColor: theme.color }}
                  title={theme.name}
                >
                  <span className="block w-3 h-3 rounded-full" style={{ backgroundColor: theme.accent }} />
                  <span className="absolute right-14 top-1/2 -translate-y-1/2 bg-black/90 backdrop-blur-sm border border-white/10 text-white font-medium tracking-wide text-[11px] px-3 py-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden md:block z-50 shadow-xl whitespace-nowrap">
                    {theme.name} Theme
                  </span>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ThemeSelector;
