import { lazy, Suspense, useEffect } from "react";
import { Hero } from "./hero";
import { FloatingAI } from "../components/floatBot";
import { Helmet } from "react-helmet";
import videoUrl from "../assets/opt_3DLogo.mp4";

const QUESTIONS = lazy(() => import("./questions").then(m => ({ default: m.QUESTIONS })));
const SOLUTIONS = lazy(() => import("./solution").then(m => ({ default: m.SOLUTIONS })));
const CAREERS = lazy(() => import("./careers").then(m => ({ default: m.CAREERS })));
const SERVICES = lazy(() => import("./services").then(m => ({ default: m.SERVICES })));
const CAPABILITIES = lazy(() => import("./capabilities").then(m => ({ default: m.CAPABILITIES })));
const Contact = lazy(() => import("../pages/contactform").then(m => ({ default: m.Contact })));

export const HomePage = () => {
  useEffect(() => {
    document.title = "Home - Dashurai";
  }, []);
  
  return (
    <>
      <Helmet>
        <title>Dashurai - Empowering Innovation, Connecting the Future | AI & Automation Solutions</title>
        <meta name="description" content="Dashurai is an innovative tech company shaping the future through cutting-edge AI solutions, automation, and exceptional service. Transform your business with intelligent technology." />
        <meta name="keywords" content="Dashurai, AI solutions, automation, machine learning, artificial intelligence, tech innovation, digital transformation, business automation, intelligent systems" />
        <link rel="canonical" href="https://www.dashurai.com/" />
        <meta property="og:title" content="Dashurai - Empowering Innovation, Connecting the Future" />
        <meta property="og:description" content="An innovative tech company dedicated to shaping the future through cutting-edge AI solutions, automation, and exceptional service." />
        <meta property="og:url" content="https://www.dashurai.com/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Dashurai - Empowering Innovation, Connecting the Future" />
        <meta name="twitter:description" content="An innovative tech company dedicated to shaping the future through cutting-edge AI solutions." />
      </Helmet>
      <div className="absolute box-border caret-transparent shrink-0 container order-[-1000] pointer-events-none z-0 overflow-hidden top-0 inset-x-0">
        <div className="absolute aspect-[1.01632_/_1] box-border caret-transparent shrink-0 top-[-141px] translate-x-[-50.0%] w-[1038px] left-[32%]">
          <div className="absolute box-border caret-transparent inset-0">
            <img
              sizes="1038px"
              className="aspect-[auto_1868_/_1838] box-border caret-transparent h-full object-cover w-full"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
      <div className="relative content-center container items-center bg-slate-950 box-border caret-transparent gap-x-0 contents flex-col h-min justify-start min-h-screen gap-y-0">
        <div className="relative box-border caret-transparent shrink-0">
          <Hero variant="empty" />
        </div>
        <Hero
          variant="full"
          videoUrl={videoUrl}
          titleLine1="Empowering, "
          titleLine2="Innovation, "
          titleLine3="Connecting the Future."
          description="An innovative tech company dedicated to shaping the future through cutting-edge solutions and exceptional service."
          descriptionHighlight1="cutting-edge solutions"
          descriptionHighlight2="exceptional service"
          ctaUrl="#contact"
          ctaText="Get Started"
        />
        <Suspense fallback={<div className="min-h-[200px]" />}>
          <QUESTIONS/>
        </Suspense>
        <Suspense fallback={<div className="min-h-[200px]" />}>
          <SOLUTIONS />
        </Suspense>
        <Suspense fallback={<div className="min-h-[200px]" />}>
          <CAREERS limit={3} isHomePage={true} />
        </Suspense>
        <Suspense fallback={<div className="min-h-[200px]" />}>
          <SERVICES />
        </Suspense>
        <Suspense fallback={<div className="min-h-[200px]" />}>
          <CAPABILITIES />
        </Suspense>
        <Suspense fallback={<div className="min-h-[200px]" />}>
          <Contact />
        </Suspense>
      </div>
      <FloatingAI />
    </>
  );
};
