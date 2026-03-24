import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { services } from '../data/services';

const ServiceCard = ({ service, index }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Icon = service.icon;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="bg-surface p-10 rounded-[2rem] border border-border transition-colors duration-500 group cursor-default shadow-xl hover:shadow-[0_30px_60px_rgba(0,0,0,0.15)] relative overflow-visible"
    >
      <div 
        className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-full transition-transform duration-[1s] group-hover:scale-[1.8] group-hover:bg-accent/10 pointer-events-none" 
        style={{ transform: "translateZ(20px)" }} 
      />
      <div 
        className="w-16 h-16 bg-text-main/5 rounded-2xl flex items-center justify-center mb-8 text-accent group-hover:bg-accent group-hover:text-primary transition-colors duration-500 border border-text-main/10 group-hover:border-transparent" 
        style={{ transform: "translateZ(40px)" }}
      >
        <Icon size={28} />
      </div>
      <h3 
        className="text-2xl font-bold text-text-main mb-4 tracking-wide transition-colors group-hover:text-accent duration-500" 
        style={{ transform: "translateZ(30px)" }}
      >
        {service.title}
      </h3>
      <p 
        className="text-text-muted leading-relaxed font-light transition-colors" 
        style={{ transform: "translateZ(20px)" }}
      >
        {service.description}
      </p>
    </motion.div>
  );
};

const Services = () => {
  return (
    <section id="services" className="py-32 px-6 md:px-20 bg-primary relative overflow-hidden transition-colors duration-500" style={{ perspective: "2000px" }}>
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20 max-w-3xl mx-auto"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-text-main tracking-tight transition-colors">Our Expertise</h2>
          <p className="text-text-muted text-xl font-light transition-colors">Discover unparalleled interior design crafted through highly interactive methodologies.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10" style={{ transformStyle: "preserve-3d" }}>
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
export default Services;
