import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { JobDetails } from '../components/JobDetails';
import { ApplicationForm } from '../components/ApplicationForm';

export default function ApplyForm() {
  const { id } = useParams<{ id: string }>();
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => window.scrollTo(0, 0), []);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      setIsSubmitted(true);
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    }, 500);
  };

  return (
    <div className="min-h-screen text-white px-6 py-12 lg:py-24 font-plus_jakarta_sans_variable">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* LEFT: STICKY SIDEBAR */}
        <div className="lg:col-span-4 lg:sticky lg:top-24">
          <div className="border-l-2 border-blue-500 pl-6">
            <h2 className="text-xs tracking-widest text-blue-500 font-bold uppercase">Dashur AI</h2>
            <h1 className="text-4xl font-bold capitalize mt-2">{id?.replace(/-/g, ' ')}</h1>
          </div>
        </div>

        {/* RIGHT: CONTENT & FORM */}
        <div className="lg:col-span-8 space-y-20">
          <JobDetails id={id} />
          <AnimatePresence mode="wait">
            <ApplicationForm 
              onSubmit={handleApply} 
              isSubmitted={isSubmitted} 
              jobTitle={id?.replace(/-/g, ' ')} 
            />
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}