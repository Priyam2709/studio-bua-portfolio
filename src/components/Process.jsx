import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ClipboardList, PenTool, Gem, HardHat, Key } from 'lucide-react';

const steps = [
  { id: 1, title: 'Consultation', icon: ClipboardList, desc: 'Initial meeting to understand your vision, lifestyle requirements, and budget constraints.' },
  { id: 2, title: 'Design Planning', icon: PenTool, desc: 'Development of 2D layouts and high-fidelity 3D renderings of your future space.' },
  { id: 3, title: 'Material Selection', icon: Gem, desc: 'Curating premium finishes, custom textures, and bespoke furniture handpicked for your exact space.' },
  { id: 4, title: 'Execution', icon: HardHat, desc: 'I personally oversee a trusted execution network to transform the blueprints into reality with clinical precision.' },
  { id: 5, title: 'Handover', icon: Key, desc: 'Final walkthrough and presentation of your beautifully completed, move-in-ready project.' },
];

const Process = () => {
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 50%"]
  });

  const pathHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" className="py-32 px-6 md:px-20 bg-surface transition-colors duration-500 overflow-hidden" ref={containerRef}>
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24 max-w-3xl mx-auto"
        >
          <div className="text-accent font-bold uppercase tracking-[0.3em] text-xs mb-6">Our Methodology</div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-text-main tracking-tight transition-colors">How We Work</h2>
          <p className="text-text-muted text-xl font-light transition-colors">A seamless, transparent journey from a blank canvas to your dream home.</p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto pl-8 md:pl-0">
          {/* Vertical Track Line */}
          <div className="absolute left-[24px] md:left-1/2 top-4 bottom-4 w-1 bg-border md:-translate-x-1/2 rounded-full" />
          
          {/* Animated Fill Line */}
          <motion.div 
            className="absolute left-[24px] md:left-1/2 top-4 w-1 bg-accent md:-translate-x-1/2 rounded-full z-0 origin-top" 
            style={{ height: pathHeight }}
          />

          <div className="flex flex-col gap-12 md:gap-24 relative z-10 py-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;
              return (
                <div key={step.id} className={`flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-16 w-full ${isEven ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Content Card */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
                    className={`flex-1 w-full bg-primary border border-border p-8 md:p-12 rounded-[2rem] shadow-xl hover:shadow-[0_20px_40px_rgba(var(--accent),0.1)] hover:border-accent/40 transition-all duration-500 relative group overflow-hidden ${isEven ? 'md:text-left' : 'md:text-right'}`}
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-[100%] transition-transform duration-700 group-hover:scale-[2] pointer-events-none" />
                    <div className="text-accent font-bold text-[10px] uppercase tracking-[0.2em] mb-4">Phase 0{step.id}</div>
                    <h3 className="text-3xl font-bold text-text-main mb-4 tracking-tight">{step.title}</h3>
                    <p className="text-text-muted text-lg font-light leading-relaxed">{step.desc}</p>
                  </motion.div>

                  {/* Icon Node */}
                  <motion.div 
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, type: "spring", delay: 0.2 }}
                    className="absolute left-0 md:relative md:left-auto w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary border-4 border-accent flex items-center justify-center shrink-0 shadow-[0_0_30px_rgba(var(--accent),0.3)] z-10"
                  >
                    <Icon className="text-text-main" size={24} />
                  </motion.div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block flex-1" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
