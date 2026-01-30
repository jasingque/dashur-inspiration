import { useEffect } from "react";
import { TrustCard, type CapabilityItem } from "../components/capabilitiesCard";

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
      { id: 1, label: "[ Apple ]", title: "iOS", imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apple/apple-original.svg" },
      { id: 2, label: "[ Google ]", title: "Android", imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/android/android-plain.svg" },
      { id: 3, label: "[ Cross Platform ]", title: "Flutter", imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg" },
    ],
  },
  {
    title: "Backend & Systems",
    duration: "40s",
    reverse: true,
    items: [
      { id: 5, label: "[ Language ]", title: "Python", imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
      { id: 6, label: "[ Framework ]", title: "Django", imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg" },
      { id: 7, label: "[ Framework ]", title: "Laravel", imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg" },
      { id: 8, label: "[ Language ]", title: "Go", imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg" },
      { id: 9, label: "[ Language ]", title: "Java", imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
    ],
  },
  {
    title: "Frontend Development",
    duration: "30s",
    reverse: false,
    items: [
      { id: 10, label: "[ Library ]", title: "React JS", imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
      { id: 11, label: "[ Runtime ]", title: "Node.js", imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
      { id: 12, label: "[ Language ]", title: "TypeScript", imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
      { id: 13, label: "[ Framework ]", title: "Next.js", imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" },
    ],
  },
  {
    title: "Certifications",
    duration: "35s",
    reverse: true,
    items: [
      { id: 14, label: "[ Cloud ]", title: "Ultimate AWS Cloud", imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original.svg" },
      { id: 15, label: "[ Cloud ]", title: "GCP Associate Cloud", imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg" },
      { id: 16, label: "[ System ]", title: "Mac OS Terminal", imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apple/apple-original.svg" },
      { id: 17, label: "[ Language ]", title: "Python Intermediate", imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
      { id: 18, label: "[ Version Control ]", title: "Github / Git", imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" },
      { id: 19, label: "[ Development ]", title: "Frontend Development", imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
      { id: 20, label: "[ Development ]", title: "Full Stack Development", imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
      { id: 21, label: "[ Runtime ]", title: "Node JS", imageUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
    ],
  },
];

// --- Sub-Components ---

const CertificationCard = ({ label, imageUrl, title }: Omit<CapabilityItem, "id">) => {
  return (
    <div className="group relative flex h-full w-[320px] shrink-0 flex-col justify-between overflow-hidden rounded-3xl border border-gradient-to-r from-cyan-500/30 to-blue-500/30 bg-gradient-to-br from-purple-900/40 via-blue-900/30 to-indigo-900/40 backdrop-blur-sm p-8 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20">
      {/* Decorative corner elements */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-400/50 rounded-tl-lg"></div>
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-purple-400/50 rounded-tr-lg"></div>
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-blue-400/50 rounded-bl-lg"></div>
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-indigo-400/50 rounded-br-lg"></div>
      
      {/* Glowing background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          <p className="font-plus_jakarta_sans text-xs font-bold tracking-widest text-cyan-300 uppercase">
            {label}
          </p>
        </div>
        
        {/* Icon with special effect */}
        <div className="relative mb-6 h-16 w-16">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
          <div className="relative h-full w-full rounded-xl bg-gradient-to-br from-cyan-100/10 to-purple-100/10 p-3 flex items-center justify-center">
            <img src={imageUrl} alt="" className="h-full w-full object-contain filter brightness-125" loading="lazy" />
          </div>
        </div>
      </div>

      <h3 className="relative z-10 font-plus_jakarta_sans_variable text-xl font-bold leading-tight text-white bg-gradient-to-r from-cyan-200 to-purple-200 bg-clip-text text-transparent">
        {title}
      </h3>
      
      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  );
};

const MarqueeTrack = ({ items, reverse, duration, isCertifications = false }: { items: CapabilityItem[]; reverse: boolean; duration: string; isCertifications?: boolean }) => {
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
};

const MarqueeRow = ({ row }: { row: RowConfig }) => {
  const isCertifications = row.title === "Certifications";
  
  return (
    <div className={`flex flex-col items-center gap-8 border-t ${isCertifications ? 'border-cyan-500/20' : 'border-white/10'} py-8 first:border-t-0 md:flex-row md:gap-12 md:py-12`}>
      {/* Title */}
      <div className="w-full shrink-0 px-6 text-center md:w-[200px] md:px-0 md:text-left">
        <h3 className={`font-plus_jakarta_sans text-xl font-bold uppercase leading-snug tracking-wide ${isCertifications ? 'bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent' : 'text-white'} md:text-2xl`}>
          {row.title}
        </h3>
      </div>

      {/* Marquee Area */}
      <div className={`group relative flex w-full flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)] ${isCertifications ? '[mask-image:linear-gradient(to_right,transparent,cyan_10%,cyan_90%,transparent)]' : ''}`}>
        <div className="flex w-max gap-6">
          <MarqueeTrack items={row.items} reverse={row.reverse} duration={row.duration} isCertifications={isCertifications} />
          <MarqueeTrack items={row.items} reverse={row.reverse} duration={row.duration} isCertifications={isCertifications} />
        </div>
      </div>
    </div>
  );
};

// --- Main Component ---

export const CAPABILITIES = () => {
    useEffect(() => {
          // start from top
          window.scrollTo(0, 0);
      }, []);
  return (
    <section className="relative w-full overflow-hidden pb-20 pt-[70px] md:py-[135px]">
      <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-100%); } }
        @keyframes marquee-reverse { 0% { transform: translateX(-100%); } 100% { transform: translateX(0); } }
        .animate-marquee-infinite { animation: marquee linear infinite; }
        .animate-marquee-reverse { animation: marquee-reverse linear infinite; }
      `}</style>

      <div className="mx-auto flex max-w-[1400px] flex-col gap-12 px-0 md:gap-16 md:px-6">
        <div className="mx-auto mb-8 w-full max-w-[1120px] px-6 text-center md:px-0">
          <h2 className="font-plus_jakarta_sans_variable break-words text-[40px] font-bold leading-[1.1] tracking-tight md:text-[64px]">
            <span className="bg-gradient-to-r from-white to-[#4988C4] bg-clip-text text-transparent">
              Our Capabilities
            </span>
          </h2>
        </div>

        <div className="flex flex-col w-full">
          {CAPABILITY_ROWS.map((row, index) => (
            <MarqueeRow key={index} row={row} />
          ))}
        </div>
      </div>
    </section>
  );
};