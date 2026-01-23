import { TechStackCard } from "../components/capabilitiesCard";

const STACK_DATA = [
  {
    id: "Card 1",
    number: "[01]",
    title: "OPEN AI",
    imageUrl: "https://example.com/37.png", 
    variant: "md:left-0 md:top-[160px] md:z-0",
  },
  {
    id: "Card 2",
    number: "[02]",
    title: "ZAPIER",
    imageUrl: "https://example.com/36.png",
    variant: "md:left-[160px] md:top-[120px] md:z-10",
  },
  {
    id: "Card 3",
    number: "[03]",
    title: "AIRTABLE",
    imageUrl: "https://example.com/34.png",
    variant: "md:left-[320px] md:top-[80px] md:z-20"
  },
  {
    id: "Card 4",
    number: "[04]",
    title: "LANGCHAIN",
    imageUrl: "https://example.com/33.png",
    variant: "md:left-[480px] md:top-[40px] md:z-30",
  },
  {
    id: "Card 5",
    number: "[05]",
    title: "PYTHON",
    imageUrl: "https://example.com/32.png",
    variant: "md:left-[640px] md:top-0 md:z-40",
  },
];

export const CAPABILITIES = () => {
  return (
    <section className="flex w-full flex-col items-center justify-center overflow-hidden px-6 py-[150px] md:overflow-visible md:py-[200px]">
      <div className="flex w-full max-w-[1000px] flex-col gap-12">
        
        {/* Header */}
        <h2 className="font-plus_jakarta_sans_variable break-words text-[32px] font-bold leading-tight tracking-tight md:text-[56px]">
          <span className="bg-[linear-gradient(2766deg,#9f92ff_0%,#ffffff_66%)] bg-clip-text text-transparent">
            Our Tech <br /> Stack
          </span>
        </h2>

        {/* Cards Container */}
        <div className="relative flex flex-col gap-4 md:h-[500px] md:w-full md:block">
          {STACK_DATA.map((card) => (
            <div 
              key={card.id} 
              className={`static transition-all duration-300 ease-in-out md:absolute ${card.variant}`}
            >
              <TechStackCard
                cardName={card.id}
                number={card.number}
                imageUrl={card.imageUrl}
                imageClassName="aspect-square"
                title={card.title}
                cardVariant="" 
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};