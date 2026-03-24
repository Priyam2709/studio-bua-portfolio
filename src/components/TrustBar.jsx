import React from 'react';

const TrustBar = () => {
  return (
    <div className="w-full bg-text-main text-primary py-8 md:py-6 px-6 relative z-20 border-t border-b border-text-main/10 shadow-2xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-center md:justify-around items-center gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-primary/20">
        
        <div className="flex flex-col items-center w-full md:w-auto pt-6 md:pt-0 first:pt-0">
          <span className="text-4xl md:text-3xl font-bold tracking-tighter text-accent mb-1">20+</span>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-70">Spaces Transformed</span>
        </div>
        
        <div className="flex flex-col items-center w-full md:w-auto pt-6 md:pt-0">
          <span className="text-4xl md:text-3xl font-bold tracking-tighter text-accent mb-1">NCR</span>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-70">Exclusive Focus</span>
        </div>
        
        <div className="flex flex-col items-center w-full md:w-auto pt-6 md:pt-0">
          <span className="text-4xl md:text-3xl font-bold tracking-tighter text-accent mb-1">Premium</span>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-70">Materials Sourced</span>
        </div>
        
        <div className="flex flex-col items-center w-full md:w-auto pt-6 md:pt-0">
          <span className="text-4xl md:text-3xl font-bold tracking-tighter text-accent mb-1">1-on-1</span>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-70">Dedicated Execution</span>
        </div>
        
      </div>
    </div>
  );
};

export default TrustBar;
