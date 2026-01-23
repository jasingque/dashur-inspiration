import { SolutionCard } from "../components/solutioncard";
import Hospitality from '../assets/hospitality.png';
import Healthcare from '../assets/healthcare.png';
import Manufacturing from '../assets/manufacturing.png';
import Defense from '../assets/defense.png';
import Aerospace from '../assets/aerospace.png';

const TOP_SOLUTIONS = [
  {
    title: "Healthcare",
    description: "We revolutionize patient care through robotic surgical assistance and AI diagnostics, simultaneously automating administrative workflows to maximize hospital efficiency.",
    imageUrl: Healthcare,
    variant: "md:col-span-3", // Takes up 60% width
    aspect: "md:aspect-[1802/662]"
  },
  {
    title: "Hospitality & Entertainment",
    description: "We elevate guest experiences by deploying automated check-in systems and robotic concierges, while optimizing entertainment venues with smart, adaptive equipment.",
    imageUrl: Hospitality,
    variant: "md:col-span-2", // Takes up 40% width
    aspect: "md:aspect-[1283/595]"
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

export const SOLUTIONS = () => {
  return (
    <section className="relative flex flex-col items-center justify-center w-full overflow-hidden px-6 py-[70px] md:px-0 md:py-[135px]">
      <div className="relative flex flex-col gap-8 w-full max-w-[1120px] z-[2]">
        
        <div className="absolute top-[-206px] left-[19%] w-[966px] -translate-x-1/2 z-0 opacity-50 pointer-events-none">
          <img src="https://c.animaapp.com/mkh1fbpd0ZtFWA/assets/24.png" alt="" className="w-full object-cover" />
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full">
          <div className="md:w-[190px] shrink-0">
            <p className="text-zinc-400 font-semibold tracking-wide text-sm font-plus_jakarta_sans">
              [ OUR SOLUTIONS ]
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 grow">
            <h2 className="text-3xl md:text-5xl font-plus_jakarta_sans_variable tracking-tight leading-tight md:w-1/2">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-[#00D4FF]">
                Industries We Serve
              </span>
            </h2>
            <p className="text-gray-400 text-base leading-6 md:max-w-[360px] md:w-1/2">
             Our intelligent systems eliminate operational friction, automate complex workflows, and accelerate industrial growth, ensuring you stay ahead of the curve.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 z-[2]">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {TOP_SOLUTIONS.map((item, idx) => (
              <SolutionCard
                key={idx}
                title={item.title}
                description={item.description}
                imageUrl={item.imageUrl}
                cardVariant={`w-full ${item.variant}`}
                imageVariant={`w-full object-cover ${item.aspect}`} imageSizes={""}              />
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {BOTTOM_SOLUTIONS.map((item, idx) => (
              <SolutionCard
                key={idx}
                title={item.title}
                description={item.description}
                imageUrl={item.imageUrl}
                cardVariant="w-full h-auto min-h-[320px]"
                imageVariant="aspect-[1014/596] w-full object-cover" imageSizes={""}              />
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
};