import { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';

const FocusCard = ({ text, className }: { text: string; className?: string }) => {
  const ref = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0.2, 1, 0.2]);
  const blurAmount = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [8, 0, 8]);
  const filter = useMotionTemplate`blur(${blurAmount}px)`;
  const bracketOpacity = useTransform(scrollYProgress, [0.35, 0.5, 0.65], [0, 1, 0]);
  const bracketScale = useTransform(scrollYProgress, [0.35, 0.5, 0.65], [0.9, 1, 0.9]);

  return (
    <div
      ref={ref}
      className={`absolute flex flex-col items-center justify-center w-[300px] max-w-[90vw] h-[200px] ${className}`}
    >
      <motion.div 
        style={{ opacity: bracketOpacity, scale: bracketScale }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-white/50" />
        <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-white/50" />
        <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-white/50" />
        <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-white/50" />
      </motion.div>

      <motion.div
        style={{ opacity, filter }}
        className="relative z-10 p-6"
      >
        <h3 className="text-xl md:text-2xl font-medium text-center text-white font-plus_jakarta_sans_variable leading-snug">
          {text}
        </h3>
      </motion.div>
    </div>
  );
};

export const QUESTIONS = () => {
  return (
    <section className="relative w-full">
      <div className="sticky top-0 z-10 flex items-center justify-center h-screen pointer-events-none">
        <h2 className="text-[46px] md:text-[80px] font-bold tracking-tighter text-center leading-tight drop-shadow-2xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-white to-[#4988C4]">
            Is This You?
          </span>
        </h2>
      </div>
      <div className="relative z-0 w-full max-w-[1120px] mx-auto h-[3000px] overflow-hidden pb-40">
        <FocusCard 
          text="You can't deliver 24/7 personalized service without automation." 
          className="top-[8%] left-4 md:left-[10%]" 
        />
        <FocusCard 
          text="You are drowning in medical paperwork instead of saving lives." 
          className="top-[25%] right-4 md:right-[15%]" 
        />
        <FocusCard 
          text="Your assembly speed has hit a ceiling while competitors move faster." 
          className="top-[42%] left-4 md:left-[15%]" 
        />
        <FocusCard 
          text="You need to execute high-risk missions without endangering lives." 
          className="top-[59%] right-4 md:right-[10%]" 
        />
        <FocusCard 
          text="You want to innovate in air and space, but your tools are stuck in the past." 
          className="top-[78%] left-4 md:left-[5%]" 
        />
      </div>
    </section>
  );
};