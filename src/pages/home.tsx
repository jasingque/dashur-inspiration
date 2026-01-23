import { Hero } from "./hero";
import { QUESTIONS } from "./questions";
import { SOLUTIONS } from "./solution";
import { CAREERS } from "./careers";
import { SERVICES } from "./services";
import { CAPABILITIES } from "./capabilities";
import { Contact } from "../pages/contactform";
import { FloatingAI } from "../components/floatBot";

export const HomePage = () => {
  return (
    <>
      <div className="absolute box-border caret-transparent shrink-0 h-[913px] order-[-1000] pointer-events-none z-0 overflow-hidden top-0 inset-x-0">
        <div className="absolute aspect-[1.01632_/_1] box-border caret-transparent shrink-0 top-[-141px] translate-x-[-50.0%] w-[1038px] left-[32%]">
          <div className="absolute box-border caret-transparent inset-0">
            <img
              sizes="1038px"
              src="https://c.animaapp.com/mkh1fbpd0ZtFWA/assets/39.png"
              alt=""
              className="aspect-[auto_1868_/_1838] box-border caret-transparent h-full object-cover w-full"
            />
          </div>
        </div>
      </div>
      <div className="relative content-center items-center bg-slate-950 box-border caret-transparent gap-x-0 contents flex-col h-min justify-start min-h-[1000px] gap-y-0">
        <div className="relative box-border caret-transparent shrink-0">
          <Hero variant="empty" />
        </div>
        <Hero
          variant="full"
          videoUrl="/src/assets/3DLogo.mp4"
          titleLine1="Empowering,Innovation,"
          titleLine2="Connecting the Future."
          description="An innovative tech company dedicated to shaping the future through cutting-edge solutions and exceptional service."
          descriptionHighlight1="cutting-edge solutions"
          descriptionHighlight2="exceptional service"
          ctaUrl="#contact"
          ctaText="Get Started"
        />
        <QUESTIONS text={""} />
        <SOLUTIONS />
        <CAREERS />
        <SERVICES />
        <CAPABILITIES />
        <Contact />
      </div>
      <FloatingAI />
    </>
  );
};
