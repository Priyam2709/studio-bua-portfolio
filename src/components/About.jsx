import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const About = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const text = "With over a decade of experience in transforming high-end residential and commercial spaces, we believe that an environment should not just look beautiful—it should feel uniquely yours.";
  const words = text.split(" ");

  return (
    <section id="about" className="py-32 px-6 md:px-20 bg-primary relative overflow-hidden transition-colors duration-500">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24 relative z-10">
        
        <div className="w-full lg:w-1/2 relative">
          <motion.div 
            initial={{ height: "100%" }}
            whileInView={{ height: "0%" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-0 left-0 w-full bg-primary z-20"
          />
          <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl">
            <motion.img 
              style={{ y }}
              src="/assets/images/WhatsApp Image 2025-02-28 at 20.30.29_3ff0fc93.jpg" 
              alt="Principal Designer"
              className="w-full h-[130%] object-cover -top-[15%] absolute"
            />
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            animate={{ y: [0, -15, 0] }}
            className="absolute -bottom-6 -right-6 bg-surface p-8 rounded-[1.5rem] shadow-xl border border-border transition-colors duration-500"
          >
            <div className="text-4xl font-bold text-accent mb-1 flex items-baseline">
              12<span className="text-lg ml-1 text-text-main">+</span>
            </div>
            <div className="text-xs font-bold uppercase tracking-widest text-text-muted">
              Years of<br/>Design Excellence
            </div>
          </motion.div>
        </div>

        <div className="w-full lg:w-1/2">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 className="text-accent font-bold uppercase tracking-[0.3em] text-xs mb-6">Our Philosophy</h3>
            <h2 className="text-4xl md:text-5xl font-bold text-text-main mb-10 leading-[1.2] tracking-tight transition-colors">
              Designing spaces that inspire and elevate the human experience.
            </h2>
            
            <p className="text-text-muted text-xl font-light leading-relaxed mb-10 transition-colors">
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.02 }}
                  className="inline-block mr-1"
                >
                  {word}
                </motion.span>
              ))}
            </p>

            <ul className="space-y-6 mb-12">
              {['Bespoke Furniture Curation', 'Spatial Flow Optimization', 'Sustainable Material Selection'].map((item, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 + (i * 0.1) }}
                  className="flex items-center text-text-main font-medium group transition-colors"
                >
                  <span className="w-12 h-[1px] bg-accent/30 mr-6 group-hover:w-20 transition-all duration-300 group-hover:bg-accent"></span>
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
export default About;
