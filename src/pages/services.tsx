import { TrustCard } from "../components/serviceCard";
import graphicDesign from "../assets/graphicdesign.png";

const TRUST_CARDS_DATA = [
  {
    id: 1,
    label: "[ Graphic Design ]",
    title: "Defining your brand",
    imageUrl: graphicDesign,
  },
  {
    id: 2,
    label: "[ UI/UX Design ]",
    title: "Defining your brand",
    imageUrl: "https://example.com/11.avif",
  },
  {
    id: 3,
    label: "[ APP DEVELOPMENT ]",
    title: "Defining your brand",
    imageUrl: "https://example.com/8.avif",
  },
  {
    id: 4,
    label: "[ WEB DEVELOPMENT ]",
    title: "Defining your brand",
    imageUrl: "https://example.com/10.avif",
  },
  {
    id: 5,
    label: "[ Digital Marketing ]",
    title: "Defining your brand",
    imageUrl: "https://example.com/11.avif",
  },
  {
    id: 6,
    label: "[ SEO ]",
    title: "Defining your brand",
    imageUrl: "https://example.com/14.avif",
  },
];

export const SERVICES = () => {
  return (
    <section className="relative w-full overflow-hidden pt-[70px] pb-20 md:py-[135px]">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee-infinite {
          animation: marquee 30s linear infinite;
        }
      `}</style>

      <div className="mx-auto flex flex-col gap-12 md:gap-16">
        
        {/* Header */}
        <div className="w-full px-6 md:px-0 max-w-[1120px] mx-auto">
          <h2 className="font-plus_jakarta_sans_variable text-[32px] leading-[38.4px] tracking-[-0.96px] md:text-[56px] md:leading-[67.2px] md:tracking-[-1.68px]">
            <span className="bg-[linear-gradient(276deg,#00D4FF_0%,#ffffff_66%)] bg-clip-text text-transparent">
              Our Services
            </span>
          </h2>
        </div>
        <div className="relative flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
        
          <div className="flex w-max">
            <div className="flex shrink-0 animate-marquee-infinite items-stretch">
              {TRUST_CARDS_DATA.map((card) => (
                <div key={`a-${card.id}`} className="w-[300px] shrink-0 mr-6 h-full">
                  <TrustCard {...card} />
                </div>
              ))}
            </div>
            <div className="flex shrink-0 animate-marquee-infinite items-stretch">
              {TRUST_CARDS_DATA.map((card) => (
                <div key={`b-${card.id}`} className="w-[300px] shrink-0 mr-6 h-full">
                  <TrustCard {...card} />
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};