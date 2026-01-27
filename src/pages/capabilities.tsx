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
];

// --- Sub-Components ---

const MarqueeTrack = ({ items, reverse, duration }: { items: CapabilityItem[]; reverse: boolean; duration: string }) => {
  const animationClass = reverse ? "animate-marquee-reverse" : "animate-marquee-infinite";
  
  return (
    <div 
      className={`flex shrink-0 items-stretch gap-6 ${animationClass} group-hover:[animation-play-state:paused]`} 
      style={{ animationDuration: duration }}
    >
      {items.map((card) => (
        <TrustCard key={card.id} {...card} />
      ))}
    </div>
  );
};

const MarqueeRow = ({ row }: { row: RowConfig }) => (
  <div className="flex flex-col items-center gap-8 border-t border-white/10 py-8 first:border-t-0 md:flex-row md:gap-12 md:py-12">
    {/* Title */}
    <div className="w-full shrink-0 px-6 text-center md:w-[200px] md:px-0 md:text-left">
      <h3 className="font-plus_jakarta_sans text-xl font-bold uppercase leading-snug tracking-wide text-white md:text-2xl">
        {row.title}
      </h3>
    </div>

    {/* Marquee Area */}
    <div className="group relative flex w-full flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
      <div className="flex w-max gap-6">
        <MarqueeTrack items={row.items} reverse={row.reverse} duration={row.duration} />
        <MarqueeTrack items={row.items} reverse={row.reverse} duration={row.duration} />
      </div>
    </div>
  </div>
);

// --- Main Component ---

export const CAPABILITIES = () => {
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