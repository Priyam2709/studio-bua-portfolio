import React from 'react';
import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <section id="contact" className="py-32 px-6 md:px-20 bg-primary relative overflow-hidden transition-colors duration-500">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px] pointer-events-none translate-x-1/2 -translate-y-1/4" />

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-6xl mx-auto bg-surface rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row border border-border relative z-10 transition-colors duration-500"
      >
        
        {/* Contact Info Side */}
        <div className="w-full md:w-5/12 bg-text-main/5 text-text-main p-12 md:p-16 flex flex-col justify-between relative overflow-hidden border-r border-border">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl transform translate-x-1/4 -translate-y-1/4" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-text-main">Start Your Project</h2>
            <p className="text-text-muted mb-12 leading-relaxed text-lg font-light">
              We take on a limited number of clients each year to ensure the highest level of dedication. Let's discuss your vision.
            </p>
            
            <div className="space-y-10">
              <div className="group">
                <h4 className="text-[12px] text-accent uppercase tracking-[0.2em] font-bold mb-2">Email</h4>
                <a href="mailto:hello@studiobua.com" className="text-2xl font-light hover:text-accent transition-colors">hello@studiobua.com</a>
              </div>
              <div className="group">
                <h4 className="text-[12px] text-accent uppercase tracking-[0.2em] font-bold mb-2">Phone</h4>
                <a href="tel:+15551234567" className="text-2xl font-light hover:text-accent transition-colors">+1 (555) 123-4567</a>
              </div>
              <div>
                <h4 className="text-[12px] text-accent uppercase tracking-[0.2em] font-bold mb-2">Studio</h4>
                <p className="text-2xl font-light leading-relaxed text-text-muted">100 Design Avenue<br/>New York, NY 10001</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Side */}
        <div className="w-full md:w-7/12 p-12 md:p-16 bg-surface flex flex-col justify-center">
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-[12px] font-bold text-text-muted mb-3 uppercase tracking-[0.2em]">Name</label>
                <input type="text" className="w-full px-5 py-4 bg-primary rounded-xl border border-border focus:border-accent outline-none transition-all text-text-main text-lg font-light shadow-inner" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-[12px] font-bold text-text-muted mb-3 uppercase tracking-[0.2em]">Phone</label>
                <input type="tel" className="w-full px-5 py-4 bg-primary rounded-xl border border-border focus:border-accent outline-none transition-all text-text-main text-lg font-light shadow-inner" placeholder="(555) 000-0000" />
              </div>
            </div>

            <div>
              <label className="block text-[12px] font-bold text-text-muted mb-3 uppercase tracking-[0.2em]">Project Type</label>
              <select className="w-full px-5 py-4 bg-primary rounded-xl border border-border focus:border-accent outline-none transition-all text-text-main text-lg font-light appearance-none cursor-pointer shadow-inner">
                <option className="bg-surface text-text-main">Residential Renovation</option>
                <option className="bg-surface text-text-main">New Construction</option>
                <option className="bg-surface text-text-main">Commercial Space</option>
                <option className="bg-surface text-text-main">Consultation only</option>
              </select>
            </div>

            <div>
              <label className="block text-[12px] font-bold text-text-muted mb-3 uppercase tracking-[0.2em]">Project Details</label>
              <textarea rows="4" className="w-full px-5 py-4 bg-primary rounded-xl border border-border focus:border-accent outline-none transition-all resize-none text-text-main text-lg font-light shadow-inner" placeholder="Tell us about your space and goals..."></textarea>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row gap-6">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 bg-accent text-primary font-bold py-6 px-6 rounded-2xl hover:bg-text-main transition-all shadow-xl text-lg"
              >
                Submit Request
              </motion.button>
              <motion.a 
                href="https://wa.me/15551234567" 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 border-2 border-border bg-surface text-text-main font-bold py-6 px-6 rounded-2xl hover:border-accent transition-all text-center flex items-center justify-center gap-2 text-lg shadow-md hover:shadow-xl"
              >
                WhatsApp Us
              </motion.a>
            </div>
          </form>
        </div>

      </motion.div>
    </section>
  );
};
export default Contact;
