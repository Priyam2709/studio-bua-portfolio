import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Moon, Sun, Menu, X } from 'lucide-react';

const themes = [
  { id: 'navy', name: 'Navy & Brass' },
  { id: 'terracotta', name: 'Terracotta' },
  { id: 'botanical', name: 'Botanical' }
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('navy');
  const [mode, setMode] = useState('dark');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'navy';
    const savedMode = localStorage.getItem('mode') || 'dark';
    
    setCurrentTheme(savedTheme);
    setMode(savedMode);
    
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.documentElement.setAttribute('data-mode', savedMode);
  }, []);

  const changeTheme = (id) => {
    setCurrentTheme(id);
    localStorage.setItem('theme', id);
    document.documentElement.setAttribute('data-theme', id);
    setThemeOpen(false);
  };

  const toggleMode = () => {
    const newMode = mode === 'dark' ? 'light' : 'dark';
    setMode(newMode);
    localStorage.setItem('mode', newMode);
    document.documentElement.setAttribute('data-mode', newMode);
    setThemeOpen(false); // Close dropdown if open
  };

  const activeThemeName = themes.find(t => t.id === currentTheme)?.name || 'Theme';

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed z-[999] transition-all duration-500 flex items-center justify-between mx-auto left-0 right-0 ${
        scrolled 
          ? 'top-4 w-[95%] lg:w-[85%] py-3 md:py-3 px-6 md:px-8 bg-primary/95 backdrop-blur-2xl border border-border rounded-[2rem] shadow-2xl flex-wrap lg:flex-nowrap' 
          : 'top-0 w-full px-6 md:px-12 py-6 md:py-8 bg-transparent flex-wrap lg:flex-nowrap'
      }`}
    >
      {/* Top Bar for both Desktop and Mobile */}
      <div className="w-full lg:w-auto flex justify-between items-center">
        <div className={`font-bold tracking-tighter cursor-pointer select-none text-text-main transition-all duration-500 ${scrolled ? 'text-xl md:text-2xl' : 'text-2xl md:text-3xl'}`}>
          STUDIO<span className="text-accent">BUA</span>
        </div>

        {/* Mobile Hamburger Trigger */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`lg:hidden flex items-center justify-center p-2 rounded-xl backdrop-blur-md transition-colors shadow-sm border ${
            scrolled ? 'bg-surface/80 border-border text-text-main hover:bg-surface' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
          }`}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Desktop Links */}
      <div className={`hidden lg:flex items-center space-x-12 font-bold text-[15px] tracking-widest uppercase transition-colors duration-500 text-text-muted`}>
        <a href="#home" className={`transition-colors duration-300 hover:text-accent`}>Home</a>
        <a href="#projects" className={`transition-colors duration-300 hover:text-accent`}>Projects</a>
        <a href="#services" className={`transition-colors duration-300 hover:text-accent`}>Services</a>
        <a href="#contact" className={`transition-colors duration-300 hover:text-accent`}>Contact</a>
      </div>

      {/* Desktop & Mobile Actions */}
      <div className="hidden lg:flex items-center gap-3 md:gap-4">
        
        <button
          onClick={toggleMode}
          className={`flex items-center justify-center rounded-xl backdrop-blur-md transition-all duration-300 shadow-sm border border-border bg-surface/80 text-text-main hover:bg-surface ${
            scrolled ? 'w-10 h-10 md:w-11 md:h-11' : 'w-11 h-11 md:w-12 md:h-12'
          }`}
          title={`Switch to ${mode === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          {mode === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <div className="relative">
          <button 
            onClick={() => setThemeOpen(!themeOpen)}
            className={`flex items-center gap-2 md:gap-3 rounded-xl backdrop-blur-md transition-all duration-300 font-medium text-xs md:text-sm shadow-sm border border-border bg-surface/80 hover:bg-surface text-text-main ${
              scrolled ? 'px-4 py-2.5 md:py-3' : 'px-5 py-3 md:px-6 md:py-3.5'
            }`}
          >
            <span>{activeThemeName}</span>
            <ChevronDown size={18} className={`transition-transform duration-300 ${themeOpen ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {themeOpen && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute top-[110%] right-0 w-56 bg-surface border border-border rounded-xl shadow-2xl overflow-hidden py-2"
              >
                {themes.map(t => (
                  <button
                    key={t.id}
                    onClick={() => changeTheme(t.id)}
                    className={`w-full text-left px-6 py-3.5 text-[14px] font-bold transition-colors border-l-4 ${
                      currentTheme === t.id 
                        ? 'bg-accent/10 text-accent border-accent' 
                        : 'text-text-muted hover:bg-text-main/5 hover:text-text-main border-transparent'
                    }`}
                  >
                    {t.name}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <a 
          href="#contact"
          className={`rounded-xl font-bold text-xs md:text-sm uppercase tracking-wider transition-all duration-300 flex items-center justify-center bg-accent text-primary hover:bg-text-main hover:shadow-xl hover:-translate-y-1 ${
            scrolled ? 'px-6 py-2.5 shadow-sm' : 'px-8 py-3.5 shadow-lg'
          }`}
        >
          Book Consultation
        </a>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={`w-full lg:hidden overflow-hidden flex flex-col gap-6 mt-4 ${scrolled ? '' : 'bg-surface/95 backdrop-blur-3xl p-6 rounded-3xl border border-border mt-6'}`}
          >
            <div className="flex flex-col gap-6 font-bold text-2xl tracking-wide text-text-main">
              <a href="#home" onClick={() => setMobileMenuOpen(false)} className="hover:text-accent transition-colors">Home</a>
              <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="hover:text-accent transition-colors">Projects</a>
              <a href="#services" onClick={() => setMobileMenuOpen(false)} className="hover:text-accent transition-colors">Services</a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-accent transition-colors">Contact</a>
            </div>

            <div className="w-full h-[1px] bg-border my-2" />

            {/* Mobile Controls */}
            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <button
                  onClick={toggleMode}
                  className="flex-1 flex items-center justify-center py-4 rounded-xl border border-border bg-text-main/5 text-text-main"
                >
                  <span className="mr-3 font-bold text-sm tracking-widest uppercase">{mode === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                  {mode === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {themes.map(t => (
                  <button
                    key={t.id}
                    onClick={() => changeTheme(t.id)}
                    className={`py-3 text-[11px] uppercase tracking-widest font-bold rounded-xl border transition-colors ${
                      currentTheme === t.id 
                        ? 'bg-accent/10 border-accent text-accent' 
                        : 'border-border bg-surface text-text-muted'
                    }`}
                  >
                    {t.id}
                  </button>
                ))}
              </div>

              <a 
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full rounded-xl font-bold text-sm uppercase tracking-widest py-4 flex items-center justify-center bg-accent text-primary hover:bg-text-main"
              >
                Book Consultation
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.nav>
  );
};

export default Navbar;
