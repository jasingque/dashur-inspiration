import { TechStackCard } from "../components/serviceCard";
import graphicDesign from "../assets/graphicdesign.png";
import uiuxDesign from "../assets/uiUxDesign.png";
import appDevelopment from "../assets/appDevelopment.png";
import webDevelopment from "../assets/webDevelopment.png";
import digitalMarketing from "../assets/digitalMarketing.png";
import seo from "../assets/seo.png";

const STACK_DATA = [
  {
    id: "Card 1",
    number: "[01]",
    title: "Graphic Design",
    imageUrl: graphicDesign,
    variant: "md:left-0 md:top-[160px] md:z-0",
    description: "Elevate your brand with our creative graphic design service. We transform ideas into captivating visuals that leave a lasting impression.",
  },
  {
    id: "Card 2",
    number: "[02]",
    title: "UI/UX Design",
    imageUrl: uiuxDesign,
    variant: "md:left-[160px] md:top-[120px] md:z-10",
    description: "Unlock the power of exceptional user experiences with our UI/UX design service. We ensure your product stands out and delights users.",
  },
  {
    id: "Card 3",
    number: "[03]",
    title: "APP DEVELOPMENT",
    imageUrl: appDevelopment,
    variant: "md:left-[320px] md:top-[80px] md:z-20",
    description: "Transform your ideas into exceptional mobile experiences with our cutting-edge app development services.",
  },
  {
    id: "Card 4",
    number: "[04]",
    title: "WEB DEVELOPMENT",
    imageUrl: webDevelopment,
    variant: "md:left-[480px] md:top-[40px] md:z-30",
    description: "Revolutionize your online presence with our web development services. Our skilled team creates websites that captivate users.",
  },
  {
    id: "Card 5",
    number: "[05]",
    title: "Digital Marketing",
    imageUrl: digitalMarketing,
    variant: "md:left-[640px] md:top-0 md:z-40",
    description: "Elevate your brand's online visibility and reach new heights with our comprehensive digital marketing services.",
  },
  {
    id: "Card 6",
    number: "[06]",
    title: "SEO",
    imageUrl: seo,
    variant: "md:left-[800px] md:top-[-40px] md:z-50",
    description: "Boost your online presence and climb search engine rankings with our SEO expertise. Our tailored strategies focus on traffic.",
  },
];

export const SERVICES = () => {
  return (
    <section className="flex w-full flex-col items-center justify-center overflow-hidden px-0 py-[100px] md:overflow-visible md:px-6 md:py-[200px]">
      <div className="flex w-full max-w-[1200px] flex-col gap-12 px-4 md:px-0">
        
        {/* Header */}
        <h2 className="font-plus_jakarta_sans_variable break-words text-[40px] font-bold leading-[1.1] tracking-tight md:text-[64px]">
          <span className="bg-gradient-to-br from-white to-[#4988C4] bg-clip-text text-transparent">
            Our Services
          </span>
        </h2>

        {/* Cards Container */}
        <div className="relative flex flex-col gap-4 md:h-[500px] md:w-full md:block mt-8">
          {STACK_DATA.map((card) => (
            <div
              key={card.id}
              className={`
                static w-full h-[350px]
                transition-all duration-500 ease-out 
                md:absolute md:max-w-[300px] ${card.variant}
                group [perspective:1000px]
                hover:z-[100] md:hover:z-[100]
              `}
            >
              <div className="relative h-full w-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">

                {/* --- FRONT FACE --- */}
                <div className="absolute inset-0 h-full w-full [backface-visibility:hidden]">
                  <TechStackCard
                    cardName={card.id}
                    number={card.number}
                    imageUrl={card.imageUrl}
                    imageClassName="h-24 w-24 object-contain"
                    title={card.title}
                    cardVariant="group"
                  />
                </div>

                {/* --- BACK FACE --- */}
                <div className="absolute inset-0 h-full w-full rounded-3xl bg-[#111] border border-white/10 px-6 py-8 text-center  [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col items-center justify-center gap-4 shadow-xl">
                    <div className="text-sm font-bold text-[#4988C4]">{card.number}</div>
                    <h3 className="text-xl font-bold text-white">{card.title}</h3>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {card.description}
                    </p>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};