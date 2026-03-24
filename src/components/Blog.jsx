import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const articles = [
  { id: 1, title: 'The Psychology of Color in Minimalist Spaces', category: 'Interior Trends', date: 'Oct 2025', img: '/assets/images/WhatsApp Image 2025-02-28 at 20.30.29_d062dc96.jpg', excerpt: 'How specific warm tones can drastically alter the perceived temperature and volume of narrow Delhi apartments.' },
  { id: 2, title: 'Maximizing Natural Light in NCR High-Rises', category: 'Space Planning', date: 'Nov 2025', img: '/assets/images/WhatsApp Image 2025-02-28 at 20.30.28_73b5f9ce.jpg', excerpt: 'Strategic placement of reflective surfaces and low-profile furniture to pull ambient sunlight deep into residential cores.' },
  { id: 3, title: 'Why Calacatta Gold Marble Remains the Premium Choice', category: 'Material Sourcing', date: 'Dec 2025', img: '/assets/images/WhatsApp Image 2025-02-28 at 20.30.31_2bd3e7e5.jpg', excerpt: 'Understanding the veining, density, and maintenance of the world\'s most sought-after Italian stone.' }
];

const Blog = () => {
  return (
    <section id="insights" className="py-32 px-6 md:px-20 bg-surface transition-colors duration-500 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <div className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] mb-6">Knowledge Base</div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-text-main tracking-tight transition-colors">Design Insights</h2>
            <p className="text-text-muted text-xl font-light transition-colors">Explore our articles covering color psychology, architectural space planning, and macro interior trends across India.</p>
          </motion.div>

          <motion.a 
            href="#contact"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold uppercase tracking-widest text-text-main flex items-center hover:text-accent transition-colors pb-2 border-b-2 border-transparent hover:border-accent"
          >
            Read All Articles <ArrowRight size={16} className="ml-3" />
          </motion.a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-primary rounded-[2rem] border border-border shadow-lg hover:shadow-[0_20px_40px_rgba(var(--accent),0.1)] hover:border-accent/40 transition-all duration-500 overflow-hidden group cursor-pointer"
            >
              <div className="h-64 overflow-hidden relative">
                <img src={article.img} alt={article.title} className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" />
                <div className="absolute top-6 left-6 bg-surface/90 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-bold tracking-wider uppercase text-text-main">
                  {article.category}
                </div>
              </div>
              
              <div className="p-8">
                <span className="text-text-muted text-xs font-bold tracking-widest uppercase mb-4 block">{article.date}</span>
                <h3 className="text-2xl font-bold text-text-main mb-4 leading-snug group-hover:text-accent transition-colors">{article.title}</h3>
                <p className="text-text-muted font-light leading-relaxed mb-6 line-clamp-3">
                  {article.excerpt}
                </p>
                <div className="text-sm font-bold uppercase tracking-widest text-accent flex items-center">
                  Read Article <ArrowRight size={14} className="ml-2 transition-transform group-hover:translate-x-2" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
