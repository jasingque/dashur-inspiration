import { TechStackCard } from "../components/serviceCard";
import graphicDesign from "../assets/graphicdesign.webp";
import uiuxDesign from "../assets/uiUxDesign.webp";
import appDevelopment from "../assets/appDevelopment.webp";
import webDevelopment from "../assets/webDevelopment.webp";
import digitalMarketing from "../assets/digitalMarketing.webp";
import seo from "../assets/seo.webp";

const STACK_DATA = [
  {
    id: "Card 1",
    number: "[01]",
    title: "Graphic Design",
    imageUrl: graphicDesign,
    variant: "lg:left-0 lg:top-[120px] lg:z-0",
    description: "Elevate your brand with our creative graphic design service. We transform ideas into captivating visuals that leave a lasting impression.",
  },
  {
    id: "Card 2",
    number: "[02]",
    title: "UI/UX Design",
    imageUrl: uiuxDesign,
    variant: "lg:left-[140px] lg:top-[90px] lg:z-10",
    description: "Unlock the power of exceptional user experiences with our UI/UX design service. We ensure your product stands out and delights users.",
  },
  {
    id: "Card 3",
    number: "[03]",
    title: "APP DEVELOPMENT",
    imageUrl: appDevelopment,
    variant: "lg:left-[280px] lg:top-[60px] lg:z-20",
    description: "Transform your ideas into exceptional mobile experiences with our cutting-edge app development services.",
  },
  {
    id: "Card 4",
    number: "[04]",
    title: "WEB DEVELOPMENT",
    imageUrl: webDevelopment,
    variant: "lg:left-[420px] lg:top-[30px] lg:z-30",
    description: "Revolutionize your online presence with our web development services. Our skilled team creates websites that captivate users.",
  },
  {
    id: "Card 5",
    number: "[05]",
    title: "Digital Marketing",
    imageUrl: digitalMarketing,
    variant: "lg:left-[560px] lg:top-0 lg:z-40",
    description: "Elevate your brand's online visibility and reach new heights with our comprehensive digital marketing services.",
  },
  {
    id: "Card 6",
    number: "[06]",
    title: "SEO",
    imageUrl: seo,
    variant: "lg:left-[700px] lg:top-[-40px] lg:z-50",
    description: "Boost your online presence and climb search engine rankings with our SEO expertise. Our tailored strategies focus on traffic.",
  },
];

export const SERVICES = () => {
  return (
    <section className="flex w-full flex-col items-center justify-center overflow-hidden px-0 py-[100px] md:overflow-visible md:px-6 md:py-[200px]">
      <div className="flex w-full max-w-[1200px] flex-col gap-12 px-4 md:px-0">
        
        {/* Header */}
        <h2 className="font-plus_jakarta_sans_variable break-words text-3xl sm:text-4xl md:text-5xl lg:text-[64px] font-bold leading-[1.1] tracking-tight">
          <span className="bg-gradient-to-br from-white to-[#4988C4] bg-clip-text text-transparent">
            Our Services
          </span>
        </h2>

        {/* Cards Container */}
        <div className="mt-16 grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:block lg:relative lg:h-[450px]">
          {STACK_DATA.map((card, index) => {
            const leftPosition = index * 14;
            const topPosition = 150 - (index * 35);
            return(
              <div
                key={card.id}
                style={{ 
                  '--left-pos': `${leftPosition}%`, 
                  '--top-pos': `${topPosition}px`,
                  '--z-index': index
                } as React.CSSProperties}
                className={`
                  relative w-full h-[320px] transition-all duration-500 ease-in-out group [perspective:1000px]
                  lg:absolute lg:w-[260px] lg:left-[var(--left-pos)] lg:top-[var(--top-pos)] lg:z-[var(--z-index)]
                  hover:z-[100] hover:-translate-y-8
                `}
              >
              <div className="relative h-full w-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">

                {/* --- FRONT FACE --- */}
                <div className="absolute inset-0 h-full w-full [backface-visibility:hidden]">
                  <TechStackCard
                    cardName={card.id}
                    number={card.number}
                    imageUrl={card.imageUrl}
                    imageClassName="h-16 w-16 md:h-20 md:w-20 object-contain"
                    title={card.title}
                    cardVariant="group"
                  />
                </div>

                {/* --- BACK FACE --- */}
                <div className="absolute inset-0 h-full w-full rounded-[2rem] bg-[#111] border border-white/10 px-6 py-8 text-center [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col items-center justify-center gap-4 shadow-2xl">
                    <div className="text-xs font-bold text-[#4988C4]">{card.number}</div>
                    <h3 className="text-lg font-bold text-white uppercase tracking-wider">{card.title}</h3>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      {card.description}
                    </p>
                </div>

              </div>
            </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};