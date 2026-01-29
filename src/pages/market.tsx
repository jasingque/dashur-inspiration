import { SolutionCard } from "../components/solutioncard";
import { motion } from "framer-motion";
import { useEffect } from "react";
import Hospitality from '../assets/hospitality.webp';
import Healthcare from '../assets/healthcare.webp';
import Manufacturing from '../assets/manufacturing.webp';
import Defense from '../assets/defense.webp';
import Aerospace from '../assets/aerospace.webp';

const TOP_SOLUTIONS = [
  {
    title: "Healthcare",
    description: "We revolutionize patient care through robotic surgical assistance and AI diagnostics, simultaneously automating administrative workflows to maximize hospital efficiency.",
    imageUrl: Healthcare,
    className: "md:col-span-3",
    aspect: "aspect-[16/9] md:aspect-[21/9]"
  },
  {
    title: "Hospitality & Entertainment",
    description: "We elevate guest experiences by deploying automated check-in systems and robotic concierges, while optimizing entertainment venues with smart, adaptive equipment.",
    imageUrl: Hospitality,
    className: "md:col-span-2",
    aspect: "aspect-[16/9] md:aspect-[3/2]"
  },
];

const BOTTOM_SOLUTIONS = [
  {
    title: "Manufacturing",
    description: "We drive production precision with automated assembly lines and predictive maintenance algorithms designed to adapt instantly to shifting market demands.",
    imageUrl: Manufacturing,
  },
  {
    title: "Defense",
    description: "We reshape military capabilities using autonomous drones and intelligent surveillance, enhancing situational awareness while minimizing human risk in the battlefield.",
    imageUrl: Defense,
  },
  {
    title: "Aerospace",
    description: "We ensure safer air and space travel through autonomous navigation and engineering, while also managing immersive aerospace exhibitions to engage the public.",
    imageUrl: Aerospace,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6 } 
  },
};

export const MarketPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <section className="relative flex w-full flex-col items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 xl:py-32">
        <motion.div 
          className="relative z-[2] flex w-full max-w-7xl flex-col gap-8 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >

          <div className="pointer-events-none absolute left-[19%] top-[-206px] z-0 w-[966px] -translate-x-1/2 opacity-50 hidden lg:block">
            <img src="https://c.animaapp.com/mkh1fbpd0ZtFWA/assets/24.png" alt="" className="w-full object-cover" />
          </div>

          {/* Header Section */}
          <motion.div variants={itemVariants} className="flex w-full flex-col gap-4 sm:gap-6 lg:flex-row lg:gap-8">
            <div className="shrink-0 lg:w-[190px]">
              <p className="font-plus_jakarta_sans text-xs sm:text-sm font-semibold tracking-wide text-zinc-400 uppercase">
                [ OUR MARKETS ]
              </p>
            </div>
            
            <div className="flex grow flex-col gap-4 sm:gap-6 lg:flex-row">
              <h2 className="font-plus_jakarta_sans_variable font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight tracking-tight">
                <span className="bg-gradient-to-r from-white to-[#4988C4] bg-clip-text text-transparent">
                  Industries We Serve
                </span>
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-gray-400 lg:w-1/2 lg:max-w-[360px] leading-relaxed">
               Our intelligent systems eliminate operational friction, automate complex workflows, and accelerate industrial growth, ensuring you stay ahead of the curve.
              </p>
            </div>
          </motion.div>

          {/* Grid Section */}
          <div className="z-[2] flex flex-col gap-4 sm:gap-6">
            
            {/* Top Row */}
            <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-5">
              {TOP_SOLUTIONS.map((item, idx) => (
                <motion.div 
                  key={idx} 
                  variants={itemVariants} 
                  className={item.className}
                >
                  <SolutionCard
                    title={item.title}
                    description={item.description}
                    imageUrl={item.imageUrl}
                    aspectRatio={item.aspect}
                  />
                </motion.div>
              ))}
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3">
              {BOTTOM_SOLUTIONS.map((item, idx) => (
                <motion.div key={idx} variants={itemVariants}>
                  <SolutionCard
                    title={item.title}
                    description={item.description}
                    imageUrl={item.imageUrl}
                    aspectRatio="aspect-[4/3] md:aspect-[16/10]"
                  />
                </motion.div>
              ))}
            </div>
            
          </div>
        </motion.div>
      </section>
    </div>
  );
};
