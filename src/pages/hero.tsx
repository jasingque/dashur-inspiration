export type HeroProps = {
  variant: "full" | "empty";
  videoUrl?: string;
  titleLine1?: string;
  titleLine2?: string;
  description?: string;
  descriptionHighlight1?: string;
  descriptionHighlight2?: string;
  ctaUrl?: string;
  ctaText?: string;
  ctaIconUrl?: string;
  testimonials?: Array<{
    quote: string;
    authorName: string;
    authorTitle: string;
  }>;
};

export const Hero = (props: HeroProps) => {
  if (props.variant === "empty") return null;

  return (
    <section className="relative w-full min-h-[800px] flex items-center justify-center overflow-hidden px-6 py-20">
      {/* 3D video */}
      <div className="absolute inset-0 z-0 flex justify-center pointer-events-none">
        <div className="absolute right-[-15%] w-[70%] h-full md:w-[60%] [mask-image:radial-gradient(circle_at_center,black_30%,transparent_70%)]">
          <video src={props.videoUrl} autoPlay loop muted playsInline className="w-full h-full object-contain" />
        </div>
      </div>

      <div className="relative z-10 w-full max-w-[1120px] flex flex-col">
        {/* Slogan & Description */}
        <div className="flex flex-col max-w-3xl mt-[-5%] md:mt-[-10%]">
          <div className="flex flex-col -space-y-1"> 
            <h1 className="font-bold text-[40px] md:text-7xl tracking-tight leading-[1.1] bg-gradient-to-b from-zinc-400 to-white bg-clip-text text-transparent">
              {props.titleLine1}
            </h1>
            <h1 className="font-bold text-[40px] md:text-7xl tracking-tight leading-[1.1] bg-gradient-to-r from-white via-[#00D4FF] to-[#102A75] bg-clip-text text-transparent py-1">
              {props.titleLine2}
            </h1>
          </div>
          <p className="mt-8 max-w-lg text-zinc-400 text-lg font-medium leading-relaxed">
            {props.description}
          </p>
        </div>

        {/* BUTTON */}
        <div className="mt-20 md:mt-32 flex flex-row gap-6">
          <a 
            href="/contact" 
            className="group relative inline-flex items-center justify-center px-10 py-4 font-semibold text-white bg-black/20 backdrop-blur-md rounded-xl overflow-hidden"
          >
            <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
              <rect x="0" y="0" width="100%" height="100%" rx="12" className="fill-none stroke-zinc-800 stroke-1" />
              <rect x="0" y="0" width="100%" height="100%" rx="12" 
                className="fill-none stroke-cyan-400 stroke-[3px] [stroke-dasharray:60_180] [animation:border-spin_3s_linear_infinite]"
                style={{ filter: 'drop-shadow(0 0 10px #22d3ee)' }}
              />
            </svg>
            <span className="relative z-10 text-sm md:text-base">Get Started</span>
          </a>

          <a href="/about" className="group relative inline-block w-[12rem] h-12 cursor-pointer outline-none border-0 align-middle bg-transparent p-0">
            <span className="relative block m-0 w-12 h-12 bg-cyan-700 rounded-[1.625rem] transition-all duration-500 ease-[cubic-bezier(0.65,0,0.076,1)] group-hover:w-full">
              <span className="absolute top-0 bottom-0 left-[0.625rem] m-auto w-[1.125rem] h-[0.125rem] bg-none transition-all duration-500 ease-[cubic-bezier(0.65,0,0.076,1)] group-hover:bg-white group-hover:translate-x-4">
                <span className="absolute -top-[0.29rem] right-[0.0625rem] w-[0.625rem] h-[0.625rem] border-t-2 border-r-2 border-white rotate-45"></span>
              </span>
            </span>
            <span className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center ml-[1rem] text-white transition-all duration-500 ease-[cubic-bezier(0.65,0,0.076,1)] group-hover:text-white">
              <span className="font-semibold text-sm md:text-base">Learn More</span>
            </span>
          </a>
        </div>
      </div>

      <style>{`@keyframes border-spin { from { stroke-dashoffset: 220; } to { stroke-dashoffset: 0; } }`}</style>
    </section>
  );
};