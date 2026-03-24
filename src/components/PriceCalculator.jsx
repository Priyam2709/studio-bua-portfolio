import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Building2, Grid, ChevronRight, ChevronLeft, CheckCircle2, Sparkles, Building } from 'lucide-react';

const propertyTypes = [
  { id: '1bhk', name: '1 BHK', icon: Grid, multiplier: 1 },
  { id: '2bhk', name: '2 BHK', icon: Building, multiplier: 1.5 },
  { id: '3bhk', name: '3 BHK', icon: Building2, multiplier: 2.2 },
  { id: 'villa', name: 'Villa', icon: Home, multiplier: 3.5 },
];

const designLevels = [
  { id: 'essential', name: 'Essential', pricePerSqft: 1200, desc: 'Clean, functional, beautiful core design.' },
  { id: 'premium', name: 'Premium', pricePerSqft: 2000, desc: 'High-end finishes and custom carpentry.' },
  { id: 'luxury', name: 'Luxury', pricePerSqft: 3500, desc: 'Imported materials, automation, and bespoke art.' },
];

const slideVariants = {
  enter: (direction) => ({ x: direction > 0 ? 50 : -50, opacity: 0 }),
  center: { zIndex: 1, x: 0, opacity: 1 },
  exit: (direction) => ({ zIndex: 0, x: direction < 0 ? 50 : -50, opacity: 0 })
};

const PriceCalculator = () => {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  
  // State
  const [propertyType, setPropertyType] = useState(null);
  const [area, setArea] = useState(800);
  const [designLevel, setDesignLevel] = useState(null);
  
  const [leadDetails, setLeadDetails] = useState({ name: '', phone: '' });
  const [showQuote, setShowQuote] = useState(false);

  const totalSteps = 4;

  const nextStep = () => {
    if (step === 1 && !propertyType) return;
    if (step === 3 && !designLevel) return;
    
    // Trigger quote generation logic
    if (step === 4 && leadDetails.name && leadDetails.phone) {
      setDirection(1);
      setShowQuote(true);
      return;
    }

    if (step < totalSteps) {
      setDirection(1);
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setDirection(-1);
      setStep(step - 1);
    }
  };

  const calculateEstimate = () => {
    const pType = propertyTypes.find(p => p.id === propertyType);
    const dLevel = designLevels.find(d => d.id === designLevel);
    
    if (!pType || !dLevel) return 0;
    
    const basePrice = area * dLevel.pricePerSqft;
    const finalPrice = basePrice * pType.multiplier;
    
    // Format to Indian Rupees system or standard USD
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumSignificantDigits: 3 }).format(finalPrice);
  };

  return (
    <section id="calculator" className="py-32 px-6 md:px-20 bg-surface transition-colors duration-500 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-text-main/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] mb-4">Instant Quote Engine</div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-text-main tracking-tight transition-colors">Estimate Your Dream Space</h2>
          <p className="text-text-muted text-lg md:text-xl font-light transition-colors max-w-2xl mx-auto">Use our interactive calculator to get an accurate estimation of your interior design project.</p>
        </motion.div>

        {/* The Calculator Box */}
        <div className="bg-primary border border-border rounded-[2.5rem] shadow-2xl overflow-hidden backdrop-blur-3xl min-h-[500px] flex flex-col transition-colors duration-500">
          
          {/* Header Progress */}
          {!showQuote && (
            <div className="px-8 py-6 border-b border-border bg-surface/50 flex justify-between items-center transition-colors">
              <span className="text-sm font-bold uppercase tracking-widest text-text-muted">Step 0{step} of 0{totalSteps}</span>
              <div className="flex gap-2">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className={`w-12 h-1.5 rounded-full transition-all duration-500 ${i <= step ? 'bg-accent' : 'bg-border'}`} />
                ))}
              </div>
            </div>
          )}

          {/* Form Body */}
          <div className="p-8 md:p-12 flex-1 relative flex flex-col justify-center overflow-x-hidden">
            <AnimatePresence mode="popLayout" custom={direction}>
              
              {/* --- STEP 1: PROPERTY TYPE --- */}
              {step === 1 && !showQuote && (
                <motion.div
                  key="step1"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, type: "spring", bounce: 0 }}
                  className="w-full"
                >
                  <h3 className="text-2xl font-bold text-text-main mb-8 text-center transition-colors">Select your property type</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {propertyTypes.map(p => (
                      <button
                        key={p.id}
                        onClick={() => setPropertyType(p.id)}
                        className={`flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all duration-300 gap-4 ${
                          propertyType === p.id 
                            ? 'border-accent bg-accent/5 scale-[1.02] shadow-xl text-text-main' 
                            : 'border-border bg-surface text-text-muted hover:border-text-main/30 hover:text-text-main'
                        }`}
                      >
                        <p.icon size={32} className={propertyType === p.id ? 'text-accent' : 'opacity-70'} />
                        <span className="font-bold tracking-wide">{p.name}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* --- STEP 2: AREA --- */}
              {step === 2 && !showQuote && (
                <motion.div
                  key="step2"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, type: "spring", bounce: 0 }}
                  className="w-full"
                >
                  <h3 className="text-2xl font-bold text-text-main mb-4 text-center transition-colors">What is the total area?</h3>
                  <p className="text-text-muted text-center mb-12">Drag the slider to define your square footage.</p>
                  
                  <div className="max-w-2xl mx-auto px-4">
                    <div className="flex justify-between text-4xl font-bold text-accent mb-8">
                      <span>{area}</span>
                      <span className="text-xl text-text-muted self-end mb-1">Sq. Ft.</span>
                    </div>
                    
                    <input 
                      type="range" 
                      min="300" 
                      max="10000" 
                      step="50"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      className="w-full h-3 bg-border rounded-lg appearance-none cursor-pointer accent-accent transition-colors"
                    />
                    <div className="flex justify-between text-xs font-bold text-text-muted mt-4 tracking-widest uppercase">
                      <span>300 SQFT</span>
                      <span>10,000+ SQFT</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* --- STEP 3: DESIGN LEVEL --- */}
              {step === 3 && !showQuote && (
                <motion.div
                  key="step3"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, type: "spring", bounce: 0 }}
                  className="w-full"
                >
                  <h3 className="text-2xl font-bold text-text-main mb-8 text-center transition-colors">Select your design tier</h3>
                  <div className="flex flex-col gap-4 max-w-2xl mx-auto">
                    {designLevels.map(lvl => (
                      <button
                        key={lvl.id}
                        onClick={() => setDesignLevel(lvl.id)}
                        className={`text-left flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-2xl border-2 transition-all duration-300 gap-4 ${
                          designLevel === lvl.id 
                            ? 'border-accent bg-accent/5 scale-[1.02] shadow-xl text-text-main' 
                            : 'border-border bg-surface text-text-muted hover:border-text-main/30'
                        }`}
                      >
                        <div>
                          <span className="font-bold tracking-wide text-xl block mb-2">{lvl.name}</span>
                          <span className="font-light opacity-80">{lvl.desc}</span>
                        </div>
                        {designLevel === lvl.id && <CheckCircle2 className="text-accent shrink-0" size={24} />}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* --- STEP 4: LEAD CAPTURE --- */}
              {step === 4 && !showQuote && (
                <motion.div
                  key="step4"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, type: "spring", bounce: 0 }}
                  className="w-full max-w-md mx-auto"
                >
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center text-accent">
                      <Sparkles size={32} />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-text-main mb-2 text-center transition-colors">Your estimate is ready</h3>
                  <p className="text-text-muted text-center mb-8">Where should we send the detailed breakdown?</p>
                  
                  <div className="flex flex-col gap-5">
                    <input 
                      type="text" 
                      placeholder="Full Name" 
                      value={leadDetails.name}
                      onChange={(e) => setLeadDetails({...leadDetails, name: e.target.value})}
                      className="w-full bg-surface border border-border px-6 py-4 rounded-xl text-text-main focus:outline-none focus:border-accent transition-colors"
                    />
                    <input 
                      type="tel" 
                      placeholder="Phone Number" 
                      value={leadDetails.phone}
                      onChange={(e) => setLeadDetails({...leadDetails, phone: e.target.value})}
                      className="w-full bg-surface border border-border px-6 py-4 rounded-xl text-text-main focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>
                </motion.div>
              )}

              {/* --- FINAL QUOTE SCREEN --- */}
              {showQuote && (
                <motion.div
                  key="quote"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, type: "spring" }}
                  className="w-full text-center py-10"
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-accent rounded-full text-primary mb-8 shadow-[0_0_40px_rgba(var(--accent),0.4)]">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-xl text-text-muted mb-4 uppercase tracking-widest font-bold">Estimated Investment</h3>
                  <div className="text-5xl md:text-7xl font-bold text-text-main mb-8 tracking-tighter">
                    {calculateEstimate()}
                  </div>
                  <p className="text-text-muted max-w-lg mx-auto mb-10 leading-relaxed">
                    Thank you, {leadDetails.name}! This is a preliminary estimate including {area} sq.ft of {designLevels.find(d => d.id === designLevel)?.name} design. One of our lead architects will contact you shortly to formalize the blueprint.
                  </p>
                  
                  <div className="flex justify-center gap-4">
                    <button onClick={() => { setShowQuote(false); setStep(1); }} className="px-8 py-4 border border-border rounded-xl text-text-main font-bold hover:bg-surface transition-all">
                      Recalculate
                    </button>
                    <a href="#contact" className="px-8 py-4 bg-accent text-primary rounded-xl font-bold shadow-xl hover:-translate-y-1 transition-transform">
                      Book Consultation
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer Controls */}
          {!showQuote && (
            <div className="p-6 md:px-12 md:py-8 border-t border-border bg-surface/30 flex justify-between items-center transition-colors">
              <button 
                onClick={prevStep}
                className={`flex items-center font-bold text-sm tracking-widest uppercase transition-all ${step === 1 ? 'opacity-0 pointer-events-none' : 'text-text-muted hover:text-text-main'}`}
              >
                <ChevronLeft size={18} className="mr-2" /> Back
              </button>
              
              <button 
                onClick={nextStep}
                disabled={
                  (step === 1 && !propertyType) || 
                  (step === 3 && !designLevel) || 
                  (step === 4 && (!leadDetails.name || !leadDetails.phone))
                }
                className="flex items-center px-8 py-4 bg-accent text-primary rounded-xl font-bold uppercase tracking-widest text-sm shadow-xl hover:-translate-y-1 transition-all disabled:opacity-50 disabled:hover:translate-y-0 disabled:shadow-none"
              >
                {step === totalSteps ? 'Get Exact Quote' : 'Continue'} <ChevronRight size={18} className="ml-2" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PriceCalculator;
