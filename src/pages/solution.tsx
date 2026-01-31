import { SolutionCard } from "../components/solutioncard";
import { motion } from "framer-motion";
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

// Animation Variants
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
    transition: { duration: 0.6} 
  },
};

export const SOLUTIONS = () => {
  return (
    <section className="relative flex w-full flex-col items-center justify-center overflow-hidden px-6 py-[70px] md:px-0 md:py-[135px]">
      <motion.div 
        className="relative z-[2] flex w-full max-w-[1120px] flex-col gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
      >

        {/* Header Section */}
        <motion.div variants={itemVariants} className="flex w-full flex-col gap-4 md:flex-row md:gap-6">
          <div className="shrink-0 md:w-[190px]">
            <p className="font-plus_jakarta_sans text-sm font-semibold tracking-wide text-zinc-400">
              [ OUR MARKETS ]
            </p>
          </div>
          
          <div className="flex grow flex-col gap-6 md:flex-row">
            <h2 className="font-plus_jakarta_sans_variable font-bold text-[40px] leading-tight tracking-tight md:w-1/2 md:text-[50px]">
              <span className="bg-gradient-to-r from-white to-[#4988C4] bg-clip-text text-transparent">
                Industries We Serve
              </span>
            </h2>
            <p className="text-base leading-6 text-gray-400 md:w-1/2 md:max-w-[360px]">
             Our intelligent systems eliminate operational friction, automate complex workflows, and accelerate industrial growth, ensuring you stay ahead of the curve.
            </p>
          </div>
        </motion.div>

        {/* Grid Section */}
        <div className="z-[2] flex flex-col gap-4">
          
          {/* Top Row */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
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
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
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
  );
};