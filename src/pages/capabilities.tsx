import { useEffect, useRef, useState, memo, useMemo } from "react";
import { TrustCard, type CapabilityItem } from "../components/capabilitiesCard";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet-async';

// --- Types ---
type RowConfig = {
  title: string;
  duration: string;
  reverse: boolean;
  items: CapabilityItem[];
};

// --- Configuration Data ---
const CAPABILITY_ROWS: RowConfig[] = [
  {
    title: "Mobile Development",
    duration: "30s",
    reverse: false,
    items: [
      { id: 1, label: "[ Apple ]", title: "iOS", imageUrl: "/src/assets/icons/apple.svg" },
      { id: 2, label: "[ Google ]", title: "Android", imageUrl: "/src/assets/icons/android.svg" },
      { id: 3, label: "[ Cross Platform ]", title: "Flutter", imageUrl: "/src/assets/icons/flutter.svg" },
    ],
  },
  {
    title: "Backend & Systems",
    duration: "40s",
    reverse: true,
    items: [
      { id: 5, label: "[ Language ]", title: "Python", imageUrl: "/src/assets/icons/python.svg" },
      { id: 6, label: "[ Framework ]", title: "Django", imageUrl: "/src/assets/icons/django.svg" },
      { id: 7, label: "[ Framework ]", title: "Laravel", imageUrl: "/src/assets/icons/laravel.svg" },
      { id: 8, label: "[ Language ]", title: "Go", imageUrl: "/src/assets/icons/go.svg" },
      { id: 9, label: "[ Language ]", title: "Java", imageUrl: "/src/assets/icons/java.svg" },
    ],
  },
  {
    title: "Frontend Development",
    duration: "30s",
    reverse: false,
    items: [
      { id: 10, label: "[ Library ]", title: "React JS", imageUrl: "/src/assets/icons/react.svg" },
      { id: 11, label: "[ Runtime ]", title: "Node.js", imageUrl: "/src/assets/icons/nodejs.svg" },
      { id: 12, label: "[ Language ]", title: "TypeScript", imageUrl: "/src/assets/icons/typescript.svg" },
      { id: 13, label: "[ Framework ]", title: "Next.js", imageUrl: "/src/assets/icons/nextjs.svg" },
    ],
  },
  {
    title: "Certifications",
    duration: "35s",
    reverse: true,
    items: [
      { id: 14, title: "Ultimate AWS Cloud", imageUrl: "/src/assets/icons/aws.svg" },
      { id: 15, label: "[ Cloud ]", title: "GCP Associate Cloud", imageUrl: "/src/assets/icons/googlecloud.svg" },
      { id: 16, label: "[ System ]", title: "Mac OS Terminal", imageUrl: "/src/assets/icons/apple.svg" },
      { id: 17, label: "[ Language ]", title: "Python Intermediate", imageUrl: "/src/assets/icons/python.svg" },
      { id: 18, label: "[ Version Control ]", title: "Github / Git", imageUrl: "/src/assets/icons/github.svg" },
      { id: 19, label: "[ Development ]", title: "Frontend Development", imageUrl: "/src/assets/icons/javascript.svg" },
      { id: 20, label: "[ Development ]", title: "Full Stack Development", imageUrl: "/src/assets/icons/react.svg" },
      { id: 21, label: "[ Runtime ]", title: "Node JS", imageUrl: "/src/assets/icons/nodejs.svg" },
    ],
  },
];

// --- Sub-Components ---

const TypewriterText = memo(() => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const words = useMemo(() => [
    "We don't just deploy tech;",
    "we architect legacies.",
    "We build systems designed to outpace the present",
    "and scale into the future."
  ], []);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          setIsTyping(true);
        }
      },
      { threshold: 0.3 }
    );

    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, [hasStarted]);
  
  useEffect(() => {
    if (!isTyping) return;
    
    const currentFullText = words.slice(0, currentWordIndex + 1).join(' ');
    const totalCharacters = words.join(' ').length;
    const timePerCharacter = 3000 / totalCharacters; // 3 seconds total
    
    if (displayedText.length < currentFullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => currentFullText.slice(0, prev.length + 1));
      }, Math.max(10, timePerCharacter)); // Minimum 10ms for smoothness
      return () => clearTimeout(timeout);
    } else if (currentWordIndex < words.length - 1) {
      const timeout = setTimeout(() => {
        setCurrentWordIndex(prev => prev + 1);
      }, 50); // Quick word transition
      return () => clearTimeout(timeout);
    } else {
      // Use setTimeout to avoid synchronous state update
      const timeout = setTimeout(() => {
        setIsTyping(false);
      }, 0);
      return () => clearTimeout(timeout);
    }
  }, [displayedText, currentWordIndex, isTyping, words]);
  
  return (
    <motion.div
      ref={sectionRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="flex flex-col items-center justify-center py-32 px-6"
    >
      <div className="text-center max-w-4xl">
        <h2 className="font-plus_jakarta_sans_variable font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight">
          <span className="bg-linear-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent">
            {displayedText}
            {isTyping && (
              <span className="inline-block w-0.5 h-6 sm:h-7 md:h-8 lg:h-9 bg-linear-to-b from-cyan-400 to-purple-400 ml-1 animate-pulse" />
            )}
          </span>
        </h2>
      </div>
    </motion.div>
  );
});

const CallToAction = memo(() => {
  const navigate = useNavigate();
  
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="w-full bg-slate-950 py-40 px-6"
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-plus_jakarta_sans_variable font-bold text-3xl sm:text-4xl md:text-5xl text-white mb-4"
        >
          Ready to Build Something Amazing?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-lg text-gray-400 mb-8"
        >
          Leverage our expertise in cutting-edge technologies to bring your vision to life
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/contact")} 
          className="group relative overflow-hidden rounded-md border-2 border-blue-950 bg-transparent px-8 py-3 text-sm font-bold uppercase text-white transition-all duration-500 hover:text-[#0c071e]"
        >
          <span className="relative z-10 transition-all duration-500">Get Started</span>
          
          <span className="absolute left-0 -top-full h-[15px] w-full bg-cyan-600 transition-all duration-500 group-hover:top-0" />
          <span className="absolute right-full top-[10px] h-[15px] w-full bg-cyan-600 transition-all duration-500 group-hover:right-0" />
          <span className="absolute left-full top-[20px] h-[15px] w-full bg-cyan-600 transition-all duration-500 group-hover:left-0" />
          <span className="absolute bottom-full left-0 h-[15px] w-full bg-cyan-600 transition-all duration-500 group-hover:bottom-0" />
        </motion.button>
      </div>
    </motion.section>
  );
});

const CertificationCard = memo(({ imageUrl, title }: { imageUrl: string; title: string }) => {
  // Check if this is one of the logos that should be white
  const isWhiteLogo = imageUrl.includes('aws.svg') || 
                      imageUrl.includes('apple.svg') || 
                      imageUrl.includes('github.svg');
  
  return (
    <div className="group relative flex h-full w-[280px] shrink-0 flex-col justify-between overflow-hidden rounded-3xl border border-cyan-500/10 bg-linear-to-br from-slate-900/60 via-slate-800/40 to-slate-900/60 backdrop-blur-sm p-6 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20">
      {/* Decorative corner elements - subtle when not hovered */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-cyan-400/20 rounded-tl-lg transition-opacity duration-500 group-hover:border-cyan-400/50"></div>
      <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-purple-400/20 rounded-tr-lg transition-opacity duration-500 group-hover:border-purple-400/50"></div>
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-blue-400/20 rounded-bl-lg transition-opacity duration-500 group-hover:border-blue-400/50"></div>
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-indigo-400/20 rounded-br-lg transition-opacity duration-500 group-hover:border-indigo-400/50"></div>
      
      {/* Glowing background effect - only on hover */}
      <div className="absolute inset-0 bg-linear-to-r from-cyan-500/3 to-purple-500/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative z-10">
        {/* Icon with subtle effect when not hovered */}
        <div className="relative mb-6 h-16 w-16">
          <div className="absolute inset-0 bg-linear-to-r from-cyan-500/10 to-purple-500/10 rounded-xl blur-lg opacity-0 group-hover:opacity-75 transition-opacity duration-500"></div>
          <div className="relative h-full w-full rounded-xl bg-linear-to-br from-slate-800/20 to-slate-700/20 p-3 flex items-center justify-center transition-all duration-500 group-hover:from-cyan-100/10 group-hover:to-purple-100/10">
            <img src={imageUrl} alt={title} className={`h-full w-full object-contain filter brightness-75 opacity-60 transition-all duration-500 group-hover:brightness-125 group-hover:opacity-100 ${isWhiteLogo ? 'brightness-0 invert' : ''}`} loading="lazy" decoding="async" />
          </div>
        </div>
      </div>

      <h3 className="relative z-10 font-plus_jakarta_sans_variable text-xl font-bold leading-tight bg-linear-to-r from-cyan-200/60 to-purple-200/60 bg-clip-text text-transparent transition-all duration-500 group-hover:text-white group-hover:from-cyan-200 group-hover:to-purple-200">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-cyan-400/50 rounded-full transition-opacity duration-500 group-hover:bg-cyan-400 group-hover:animate-pulse"></div>
          <span>{title}</span>
        </div>
      </h3>
      
      {/* Bottom accent line - only visible on hover */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-linear-to-r from-transparent via-cyan-400/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
    </div>
  );
});

const MarqueeTrack = memo(({ items, reverse, duration, isCertifications = false }: { items: CapabilityItem[]; reverse: boolean; duration: string; isCertifications?: boolean }) => {
  const animationClass = reverse ? "animate-marquee-reverse" : "animate-marquee-infinite";
  
  return (
    <div 
      className={`flex shrink-0 items-stretch gap-6 ${animationClass} group-hover:[animation-play-state:paused]`} 
      style={{ animationDuration: duration }}
    >
      {items.map((card) => (
        isCertifications ? <CertificationCard key={card.id} {...card} /> : <TrustCard key={card.id} {...card} />
      ))}
    </div>
  );
});

const MarqueeRow = memo(({ row }: { row: RowConfig }) => {
  const isCertifications = row.title === "Certifications";
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);
  
  if (isCertifications) {
    return (
      <div ref={sectionRef} className="flex flex-col items-center gap-8 border-t border-cyan-500/20 py-24 first:border-t-0 md:py-32">
        {/* Centered Title */}
        <div className="w-full text-center px-6">
          <h3 className="font-plus_jakarta_sans_variable wrap-break-words text-3xl sm:text-4xl md:text-5xl lg:text-[64px] font-bold leading-[1.1] tracking-tight">
            <span className="bg-linear-to-r from-white to-[#4988C4] bg-clip-text text-transparent">
              {row.title}
            </span>
          </h3>
        </div>

        {/* Centered Grid for Certifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-20 w-full max-w-6xl px-6">
          {row.items.map((card, index) => {
            const isFirstHalf = index < 4;
            const isSecondHalf = index >= 4;
            
            return (
              <div
                key={card.id}
                className={`transition-all duration-2000 ease-out ${
                  isVisible ? 'opacity-100 translate-x-0' : ''
                } ${
                  isFirstHalf ? (isVisible ? 'translate-x-0' : '-translate-x-[200px] opacity-0') : 
                  isSecondHalf ? (isVisible ? 'translate-x-0' : 'translate-x-[200px] opacity-0') : ''
                }`}
                style={{ 
                  transitionDelay: `${index * 200}ms`,
                  transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                }}
              >
                <CertificationCard key={card.id} title={card.title} imageUrl={card.imageUrl} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  
  return (
    <div className={`flex flex-col items-center gap-8 border-t border-white/10 py-8 first:border-t-0 md:flex-row md:gap-12 md:py-12`}>
      {/* Title */}
      <div className="w-full shrink-0 px-6 text-center md:w-[200px] md:px-0 md:text-left">
        <h3 className="font-plus_jakarta_sans text-xl font-bold uppercase leading-snug tracking-wide text-white md:text-2xl">
          {row.title}
        </h3>
      </div>

      {/* Marquee Area */}
      <div className="group relative flex w-full flex-1 overflow-hidden mask-[linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
        <div className="flex w-max gap-6">
          <MarqueeTrack items={row.items} reverse={row.reverse} duration={row.duration} isCertifications={isCertifications} />
          <MarqueeTrack items={row.items} reverse={row.reverse} duration={row.duration} isCertifications={isCertifications} />
        </div>
      </div>
    </div>
  );
});

// --- Main Component ---

export const CAPABILITIES = () => {
    useEffect(() => {
          window.scrollTo(0, 0);
          document.title = "Our Capabilities - Dashur AI";
      }, []);
  return (
    <>
      <Helmet>
        <title>Our Capabilities - Dashur AI | AI, Mobile, Backend & Frontend Development</title>
        <meta name="description" content="Explore Dashurai's comprehensive capabilities: iOS & Android development, Python & Django backend, React & Next.js frontend, cloud certifications (AWS, GCP), and cutting-edge AI solutions." />
        <meta name="keywords" content="AI capabilities, mobile development, iOS Android, Python Django, React Next.js, cloud solutions AWS GCP, full stack development, tech capabilities" />
        <link rel="canonical" href="https://www.dashurai.com/capabilities" />
        <meta property="og:title" content="Our Capabilities - Dashurai | AI, Mobile, Backend & Frontend Development" />
        <meta property="og:description" content="Explore Dashurai's comprehensive capabilities in mobile, backend, frontend development, and AI solutions." />
        <meta property="og:url" content="https://www.dashurai.com/capabilities" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Our Capabilities - Dashurai | AI, Mobile, Backend & Frontend Development" />
        <meta name="twitter:description" content="Explore Dashurai's comprehensive capabilities in mobile, backend, frontend development, and AI solutions." />
      </Helmet>
    <section className="relative w-full overflow-hidden pb-20 pt-20 md:pt-[135px] md:pb-[135px]">
      <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-100%); } }
        @keyframes marquee-reverse { 0% { transform: translateX(-100%); } 100% { transform: translateX(0); } }
        @keyframes fade-in-up { 0% { opacity: 0; transform: translateY(30px); } 100% { opacity: 1; transform: translateY(0); } }
        .animate-marquee-infinite { animation: marquee linear infinite; }
        .animate-marquee-reverse { animation: marquee-reverse linear infinite; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
      `}</style>

      <div className="mx-auto flex max-w-[1400px] flex-col gap-12 px-0 md:gap-16 md:px-6">
        <div className="mx-auto mb-8 w-full max-w-[1120px] px-6 text-center md:px-0">
          <h2 className="font-plus_jakarta_sans_variable wrap-break-word text-3xl sm:text-4xl md:text-5xl lg:text-[64px] font-bold leading-[1.1] tracking-tight">
            <span className="bg-linear-to-r from-white to-[#4988C4] bg-clip-text text-transparent">
              Our Capabilities
            </span>
          </h2>
        </div>

        <div className="flex flex-col w-full">
          {CAPABILITY_ROWS.map((row, index) => (
            <MarqueeRow key={index} row={row} />
          ))}
        </div>
        
        {/* Typewriter Text Section */}
        <TypewriterText />
        
        {/* Call to Action Section */}
        <CallToAction />
      </div>
    </section>
    </>
  );
};