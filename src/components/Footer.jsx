import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-primary text-text-main py-16 px-6 md:px-20 border-t border-border relative z-10 transition-colors duration-500">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
        
        <div className="text-3xl md:text-4xl font-bold tracking-tighter text-text-main transition-colors">
          STUDIO<span className="text-accent">BUA</span>
        </div>

        <div className="flex items-center gap-8 text-[11px] font-bold uppercase tracking-[0.2em] text-text-muted">
          <a href="#" className="hover:text-accent transition-colors">Instagram</a>
          <a href="#" className="hover:text-accent transition-colors">Pinterest</a>
          <a href="#" className="hover:text-accent transition-colors">LinkedIn</a>
        </div>
        
        <div className="text-text-muted opacity-60 text-xs font-medium tracking-wide transition-colors">
          &copy; {new Date().getFullYear()} Studio Bua. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
export default Footer;
