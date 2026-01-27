import { motion } from "framer-motion";
import { useEffect } from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8} 
  },
};

const stats = [
  { label: "Years of AI Innovation", value: "15+" },
  { label: "Complex Challenges Solved", value: "500+" },
  { label: "AI Systems Deployed", value: "200+" },
  { label: "Global Markets Served", value: "50+" },
];

const capabilities = [
  {
    title: "Advanced Automation",
    description: "Developing sophisticated automated solutions that integrate seamlessly with human workflows, enhancing productivity and decision-making capabilities.",
  },
  {
    title: "Cognitive Intelligence",
    description: "Creating AI systems with nuanced reasoning capabilities that complement human expertise and adapt to complex environments.",
  },
  {
    title: "Predictive Analytics",
    description: "Implementing real-time situational awareness systems that provide actionable insights and human-like acumen in critical scenarios.",
  },
  {
    title: "Market Integration",
    description: "Delivering cutting-edge solutions across diverse markets, addressing widespread demand for intelligent automation systems.",
  },
];

export const AboutPage = () => {
    useEffect(() => {
        // start from top
        window.scrollTo(0, 0);
    }, []);
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 xl:py-32">
        <div className="pointer-events-none absolute left-[19%] top-[-206px] z-0 w-[966px] -translate-x-1/2 opacity-30 hidden lg:block">
          <img src="https://c.animaapp.com/mkh1fbpd0ZtFWA/assets/24.png" alt="" className="w-full object-cover" />
        </div>
        
        <motion.div 
          className="relative z-[2] mx-auto max-w-7xl"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          <motion.div variants={itemVariants} className="flex flex-col gap-6 lg:gap-12">
            <div className="shrink-0 lg:w-[200px]">
              <p className="font-plus_jakarta_sans text-xs sm:text-sm font-semibold tracking-wider text-zinc-400 uppercase">
                [ About Us ]
              </p>
            </div>
            
            <div className="flex grow flex-col gap-8 lg:gap-12">
              <h1 className="font-plus_jakarta_sans_variable font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tight">
                <span className="bg-gradient-to-r from-white via-cyan-400 to-blue-600 bg-clip-text text-transparent">
                  Transforming Business Through AI Innovation
                </span>
              </h1>
              
              <div className="space-y-4 sm:space-y-6 text-base sm:text-lg lg:text-xl leading-7 lg:leading-8 text-gray-300 lg:max-w-4xl">
                <p>
                  While dedicated to the development of advanced automated solutions, our goal is to imbue these systems with a nuanced form of reasoning reminiscent of human cognition, thereby enhancing individual talents and capabilities.
                </p>
                <p>
                  Our specialization lies in addressing intricate challenges within demanding environments, fostering a reliance on AI for decision-making that compliments human expertise. Acknowledging the widespread demand across diverse markets, we aim to provide cutting-edge solutions with real-time situational awareness, predictive analytics, and human-like acumen.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <motion.div 
          className="mx-auto max-w-7xl"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          <motion.div 
            variants={itemVariants}
            className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900/50 to-slate-800/30 p-6 sm:p-8 lg:p-12 backdrop-blur-sm"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/10 to-blue-600/10"></div>
            <div className="relative z-10">
              <h2 className="mb-4 sm:mb-6 font-plus_jakarta_sans_variable font-bold text-2xl sm:text-3xl lg:text-4xl xl:text-5xl leading-tight tracking-tight">
                <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                  Our Mission
                </span>
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl leading-7 lg:leading-8 text-gray-200">
                Deliver exceptional service and premium applications and products that empower our clients to elevate and expand their brands.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <motion.div 
          className="mx-auto max-w-7xl"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
            {stats.map((stat, idx) => (
              <motion.div 
                key={idx} 
                variants={itemVariants}
                className="text-center"
              >
                <div className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-cyan-400">{stat.value}</div>
                <div className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Capabilities Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <motion.div 
          className="mx-auto max-w-7xl"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          <motion.div variants={itemVariants} className="mb-12 sm:mb-16 text-center">
            <h2 className="font-plus_jakarta_sans_variable font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight tracking-tight">
              <span className="bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
                Our Core Capabilities
              </span>
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2">
            {capabilities.map((capability, idx) => (
              <motion.div 
                key={idx} 
                variants={itemVariants}
                className="group rounded-xl sm:rounded-2xl border border-slate-800 bg-slate-900/30 p-6 sm:p-8 backdrop-blur-sm transition-all duration-500 hover:border-cyan-600/50 hover:bg-slate-900/60 hover:shadow-2xl hover:shadow-cyan-600/10"
              >
                <div className="mb-4 sm:mb-6 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
                <h3 className="mb-3 sm:mb-4 text-xl sm:text-2xl font-semibold text-white group-hover:text-cyan-400 transition-colors">
                  {capability.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-400 leading-relaxed">{capability.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 xl:py-32">
        <motion.div 
          className="mx-auto max-w-7xl"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          <motion.div 
            variants={itemVariants}
            className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-cyan-600 via-blue-600 to-slate-900 p-8 sm:p-12 lg:p-16 text-center"
          >
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative z-10">
              <h2 className="mb-4 sm:mb-6 font-plus_jakarta_sans_variable font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight tracking-tight">
                Ready to Transform Your Business?
              </h2>
              <p className="mb-8 sm:mb-10 text-base sm:text-lg lg:text-xl text-white/90 max-w-2xl mx-auto">
                Partner with us to leverage cutting-edge AI solutions that enhance human capabilities and drive exceptional results.
              </p>
              <button className="group relative overflow-hidden rounded-lg bg-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 font-semibold text-slate-950 transition-all duration-300 hover:bg-gray-100 hover:scale-105">
                <span className="relative z-10 text-sm sm:text-base">Get Started Today</span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-600 opacity-0 group-hover:opacity-20 transition-opacity"></div>
              </button>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};
