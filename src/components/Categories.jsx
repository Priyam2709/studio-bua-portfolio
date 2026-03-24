import React from 'react';
import { motion } from 'framer-motion';

const categoriesData = [
  { id: 'residential', title: 'Residential Interiors', img: '/assets/images/WhatsApp Image 2025-02-28 at 20.30.29_d062dc96.jpg' },
  { id: 'office', title: 'Office Layouts', img: '/assets/images/WhatsApp Image 2025-02-28 at 20.30.28_73b5f9ce.jpg' },
  { id: 'hospitality', title: 'Hospitality', img: '/assets/images/WhatsApp Image 2025-02-28 at 20.30.31_2bd3e7e5.jpg' },
  { id: 'villas', title: 'Farmhouses & Villas', img: '/assets/images/WhatsApp Image 2025-02-28 at 20.30.28_73b5f9ce.jpg' },
];

const Categories = () => {
  return (
    <section className="py-24 px-6 md:px-20 bg-primary transition-colors duration-500 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <div className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] mb-4">Structural Focus</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-text-main tracking-tight transition-colors">Sector Specialization</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:h-[400px]">
          {categoriesData.map((cat, index) => (
            <motion.a
              href="#projects"
              key={cat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1, type: "spring" }}
              className="relative group overflow-hidden rounded-[2rem] aspect-square lg:aspect-auto h-full flex flex-col justify-end p-6 border border-border shadow-xl hover:shadow-[0_20px_40px_rgba(var(--accent),0.2)] transition-all cursor-pointer"
            >
              <img 
                src={cat.img} 
                alt={cat.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-125"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="w-8 h-1 bg-accent mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <h3 className="text-2xl font-bold text-text-main tracking-tight">{cat.title}</h3>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
