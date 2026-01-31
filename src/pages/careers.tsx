import { useEffect, useRef } from "react";
import { CaseStudyCard } from "../components/careerCard";
import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import IOSDeveloper from "../assets/iosEngineer.png";
import DevOpsEngineer from "../assets/DevOpsEngineer.png";
import SoftwareEngineer from "../assets/softwareEngineer.webp";
import QAEngineer from "../assets/qaEngineer.webp";
import MobileDeveloper from "../assets/mobileDeveloper.webp";


const CASE_STUDIES = [
  {
    id: "software-developer",
    title: "Software Developer",
    tags: ["Onsite", "Open"],
    imageUrl: SoftwareEngineer,
    description: (
      <>
        Dashur AI, LLC. is one of the leading companies in our field in the area. We are hiring a talented Software Developer professional to join our team. If you're excited to be part of a winning team, Dashur AI is a great place to grow your career.
      </>
    ),
  },
  {
    id: "qa-engineer",
    title: "QA Engineer",
    tags: ["Onsite", "Open"],
    imageUrl: QAEngineer,
    description: (
      <>
        Dashur AI, LLC. is one of the leading companies in our field in the area. We are hiring a talented QA Engineer professional to join our team. If you're excited to be part of a winning team, Dashur AI is a great place to grow your career.
      </>
    ),
  },
  {
    id: "mobile-developer",
    title: "Mobile Developer",
    tags: ["Onsite", "Open"],
    imageUrl: MobileDeveloper,
    description: (
      <>
        Dashur AI, LLC is an emerging tech firm in the Las Vegas metropolitan area. We are looking to hire an experienced Mobile Developer to help us keep growing. If you're hard-working and dedicated, Dashur AI is an excellent place to grow your career.
      </>
    ),
  },
  {
    id: "ios-engineer",
    title: "iOS Engineer",
    tags: ["Onsite", "Open"],
    imageUrl: IOSDeveloper,
    description: (
      <>  
        Dashur AI, LLC. is one of the leading companies in our field in the area. We are hiring a talented iOS Engineer professional to join our team. If you're excited to be part of a winning team, Dashur AI is a great place to grow your career.
      </>
    ),
  },
  {
    id: "devops-engineer",
    title: "DevOps Engineer",
    tags: ["Onsite", "Open"],
    imageUrl: DevOpsEngineer,
    description: (
      <>  
        Dashur AI, LLC is an emerging tech firm in the Las Vegas metropolitan area. We are looking to hire an experienced DevOps Engineer to help us keep growing. If you're hard-working and dedicated, Dashur AI is an excellent place to grow your career.
      </>
    ),
  },
];

export const CAREERS = ({ limit, isHomePage = false }: { limit?: number, isHomePage?: boolean }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isHomePage) {
      window.scrollTo(0, 0);
    }
  }, [isHomePage]);
      
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.9]);
  const displayedStudies = limit ? CASE_STUDIES.slice(0, limit) : CASE_STUDIES;

  return (
    <section 
      ref={containerRef} 
      className="relative flex flex-col items-center w-full px-6 md:px-0"
    >
      
      {/* HEADER */}
      <div className="sticky top-0 z-0 flex h-screen w-full flex-col items-center justify-center">
        <motion.div style={{ opacity, scale }} className="flex flex-col items-center">
          <h2 className="text-center font-plus_jakarta_sans_variable text-[46px] font-bold leading-tight tracking-tight md:text-[80px]">
            <span className="bg-[linear-gradient(276deg,#4988C4_0%,#FFFFFF_66%)] bg-clip-text text-transparent">
              Join Our Innovative Team
            </span>
          </h2>
        </motion.div>
      </div>

      {/* CARDS CONTAINER */}
      <div className="relative z-10 mt-[-10vh] flex w-full max-w-[1120px] flex-col gap-16 md:gap-24 pb-[135px]">
        {displayedStudies.map((study, index) => (
          <div id={study.id} key={study.id}>
            <CaseStudyCard
              id={study.id}
              indexFirst="0"
              indexSecond={String(index + 1)}
              title={study.title}
              description={study.description}
              tag1={study.tags[0]}
              tag2={study.tags[1]}
              imageUrl={study.imageUrl}
            />
          </div>
        ))}

        {limit && (
<div className="flex justify-center lg:justify-start">
  <button 
    onClick={() => navigate("/careers")} 
    className="group relative overflow-hidden rounded-md border-2 border-blue-950 bg-transparent w-full py-3.5 text-sm font-bold uppercase text-white transition-all duration-500 hover:text-[#0c071e]"
  >
    <span className="relative z-10 transition-all duration-500 tracking-[0.3em]">
      More Details
    </span>
    
    {/* Background Slats - Percentage based so they cover the extra width perfectly */}
    <span className="absolute left-0 -top-full h-1/4 w-full bg-cyan-600 transition-all duration-500 group-hover:top-0" />
    <span className="absolute right-[-100%] top-[25%] h-1/4 w-full bg-cyan-600 transition-all duration-500 group-hover:right-0" />
    <span className="absolute left-[-100%] top-[50%] h-1/4 w-full bg-cyan-600 transition-all duration-500 group-hover:left-0" />
    <span className="absolute bottom-[-100%] left-0 h-1/4 w-full bg-cyan-600 transition-all duration-500 group-hover:bottom-0" />
  </button>
</div>
        )}
      </div>
    </section>
  );
};