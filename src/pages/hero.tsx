import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  
  if (props.variant === "empty") return null;

  return (
    <section className="relative w-full min-h-screen lg:min-h-[90vh] flex items-center justify-center overflow-hidden px-3 sm:px-4 md:px-6 lg:px-8 pt-2 sm:pt-2 md:pt-16 lg:pt-36 pb-4 sm:pb-4 md:pb-8 lg:pb-20">
      {/* 3D video */}
      <div className="absolute inset-0 z-0 flex justify-center pointer-events-none hidden lg:block">
        <div className="absolute right-[-5%] sm:right-[-2%] w-[85%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] h-full [mask-image:radial-gradient(circle_at_center,black_30%,transparent_70%)]">
          <video 
            src={props.videoUrl} 
            autoPlay 
            loop 
            muted 
            playsInline 
            preload="metadata"
            className="w-full h-full object-contain"
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col">
        {/* Slogan & Description */}
        <div className="flex flex-col max-w-4xl text-center lg:text-left">
          <div className="flex flex-col "> 
            <h1 className="font-bold text-5xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight leading-[1.1] bg-gradient-to-b from-zinc-400 to-white bg-clip-text text-transparent word-break:break-all">
              {props.titleLine1}
            </h1>
            <h1 className="font-bold text-5xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight leading-[1.1] bg-gradient-to-r from-white via-[#00D4FF] to-[#102A75] bg-clip-text text-transparent py-1 word-break:break-all">
              {props.titleLine2}
            </h1>
          </div>
          <p className="mt-4 sm:mt-6 max-w-2xl lg:max-w-lg text-zinc-400 text-base sm:text-lg lg:text-xl font-medium leading-relaxed">
            {props.description}
          </p>
        </div>

        {/* BUTTON */}
        <div className="mt-8 sm:mt-10 flex justify-center lg:justify-start">
        <button 
          onClick={() => navigate("/contact")} 
          className="group relative overflow-hidden rounded-md border-2 border-blue-950 bg-transparent px-10 py-4 text-base font-extrabold uppercase text-white transition-all duration-500 hover:text-[#0c071e]"
        >
          <span className="relative z-10 transition-all duration-500 tracking-wide">
            Get Started
          </span>
          
          <span className="absolute left-0 -top-full h-1/4 w-full bg-cyan-600 transition-all duration-500 group-hover:top-0" />
          <span className="absolute right-[-100%] top-[25%] h-1/4 w-full bg-cyan-600 transition-all duration-500 group-hover:right-0" />
          <span className="absolute left-[-100%] top-[50%] h-1/4 w-full bg-cyan-600 transition-all duration-500 group-hover:left-0" />
          <span className="absolute bottom-[-100%] left-0 h-1/4 w-full bg-cyan-600 transition-all duration-500 group-hover:bottom-0" />
        </button>
        </div>
      </div>

      <style>{`@keyframes border-spin { from { stroke-dashoffset: 220; } to { stroke-dashoffset: 0; } }`}</style>
    </section>
  );
};