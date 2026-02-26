import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Helmet } from 'react-helmet';
import { DashurGlobe } from '../components/DashurGlobe';

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
  hidden: { opacity: 0, y: 80 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 1 } 
  },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.8 } 
  },
};

const slideInRight = {
  hidden: { opacity: 0, x: 100 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 0.8 } 
  },
};

const stats = [
  { label: "Years of AI Innovation", value: "2+", count: 2 },
  { label: "Complex Challenges Solved", value: "500+", count: 500 },
  { label: "AI Systems Deployed", value: "200+", count: 200 },
  { label: "Global Markets Served", value: "50+", count: 50 },
];

// Counting Animation Component
const AnimatedCounter = ({ target, suffix = "", duration = 2000 }: { target: number; suffix?: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [isVisible]);
  
  useEffect(() => {
    if (!isVisible) return;
    
    const increment = target / (duration / 16); // 60fps
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [isVisible, target, duration]);
  
  return (
    <div ref={ref} className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-cyan-400 tabular-nums">
      {count}{suffix}
    </div>
  );
};

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
    window.scrollTo(0, 0);
    // Force title update
    document.title = "About Us - Dashur AI";
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Helmet>
        <title>About Us - Dashur AI | AI Innovation & Automation Experts</title>
        <meta name="description" content="Learn about Dashurai's mission to shape the future through cutting-edge AI solutions. 2+ years of innovation, 500+ challenges solved, 200+ AI systems deployed globally." />
        <meta name="keywords" content="about Dashurai, AI innovation, automation experts, AI company, machine learning solutions, tech innovation company" />
        <link rel="canonical" href="https://www.dashurai.com/about" />
        <meta property="og:title" content="About Us - Dashurai | AI Innovation & Automation Experts" />
        <meta property="og:description" content="Learn about Dashurai's mission to shape the future through cutting-edge AI solutions. 2+ years of innovation, 500+ challenges solved, 200+ AI systems deployed globally." />
        <meta property="og:url" content="https://www.dashurai.com/about" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="About Us - Dashurai | AI Innovation & Automation Experts" />
        <meta name="twitter:description" content="Learn about Dashurai's mission to shape the future through cutting-edge AI solutions." />
      </Helmet>
        {/* Hero Section - Stokt Inspired */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-linear-to-br from-slate-950 via-slate-900 to-slate-950">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]" />
        </div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto">
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center min-h-screen"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Left Column - Text Content */}
            <motion.div 
              variants={slideInLeft}
              className="lg:col-span-5 space-y-6 lg:space-y-8"
            >
              <div className="space-y-4 lg:space-y-6">
                <motion.p 
                  className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-cyan-400 uppercase"
                  variants={itemVariants}
                >
                  [ About Dashurai ]
                </motion.p>
                
                <motion.h1 
                  className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.3] tracking-tight"
                  variants={itemVariants}
                >
                  <span className="block bg-linear-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
                    Transforming
                  </span>
                  <span className="block bg-linear-to-r from-cyan-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                    Business
                  </span>
                  <span className="block bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Through AI
                  </span>
                </motion.h1>
              </div>
              
              <motion.div 
                className="space-y-4 lg:space-y-6 text-lg sm:text-xl lg:text-2xl leading-relaxed text-gray-300 max-w-2xl"
                variants={itemVariants}
              >
                <p className="font-light">
                  While dedicated to the development of advanced automated solutions, our goal is to imbue these systems with a nuanced form of reasoning reminiscent of human cognition, thereby enhancing individual talents and capabilities.
                </p>
                <p className="font-light">
                  Our specialization lies in addressing intricate challenges within demanding environments, fostering a reliance on AI for decision-making that compliments human expertise.
                </p>
              </motion.div>
            </motion.div>
            
            {/* Right Column - Globe */}
            <motion.div 
              variants={slideInRight}
              className="lg:col-span-7 relative flex items-center justify-center"
            >
              <DashurGlobe />
            </motion.div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <div className="w-6 h-10 border-2 border-cyan-400/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-cyan-400 rounded-full mt-2 animate-bounce" />
          </div>
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
            className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-800 bg-linear-to-br from-slate-900/50 to-slate-800/30 p-6 sm:p-8 lg:p-12 backdrop-blur-sm"
          >
            <div className="absolute inset-0 bg-linear-to-r from-cyan-600/10 to-blue-600/10"></div>
            <div className="relative z-10">
              <h2 className="mb-4 sm:mb-6 font-plus_jakarta_sans_variable font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight tracking-tight wrap-break-words">
                <span className="bg-linear-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
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
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-radial from-cyan-500/20 to-transparent rounded-full blur-xl group-hover:from-cyan-400/30 transition-all duration-500" />
                  <AnimatedCounter target={stat.count} suffix={stat.value.includes('+') ? '+' : ''} duration={2000} />
                </div>
                <div className="mt-4 sm:mt-6 text-sm sm:text-base text-gray-400 font-medium max-w-37.5 mx-auto">
                  {stat.label}
                </div>
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
            <h2 className="font-plus_jakarta_sans_variable font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight tracking-tight wrap-break-words">
              <span className="bg-linear-to-r from-white to-cyan-400 bg-clip-text text-transparent">
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
                <div className="mb-4 sm:mb-6 h-px bg-linear-to-r from-transparent via-cyan-400 to-transparent"></div>
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
            className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-linear-to-br from-cyan-600 via-blue-600 to-slate-900 p-8 sm:p-12 lg:p-16 text-center"
          >
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative z-10">
              <h2 className="mb-4 sm:mb-6 font-plus_jakarta_sans_variable font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-tight tracking-tight wrap-break-words">
                Ready to Transform Your Business?
              </h2>
              <p className="mb-8 sm:mb-10 text-base sm:text-lg lg:text-xl text-white/90 max-w-2xl mx-auto">
                Partner with us to leverage cutting-edge AI solutions that enhance human capabilities and drive exceptional results.
              </p>
              <motion.button 
                className="group relative overflow-hidden rounded-md border-2 border-blue-950 bg-transparent px-8 py-3 text-sm font-bold uppercase text-white transition-all duration-500 hover:text-[#0c071e]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 transition-all duration-500">Get Started Today</span>
                
                <span className="absolute left-0 -top-full h-3.75 w-full bg-cyan-600 transition-all duration-500 group-hover:top-0" />
                <span className="absolute right-full top-2.5 h-3.75 w-full bg-cyan-600 transition-all duration-500 group-hover:right-0" />
                <span className="absolute left-full top-5 h-3.75 w-full bg-cyan-600 transition-all duration-500 group-hover:left-0" />
                <span className="absolute bottom-full left-0 h-3.75 w-full bg-cyan-600 transition-all duration-500 group-hover:bottom-0" />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};
