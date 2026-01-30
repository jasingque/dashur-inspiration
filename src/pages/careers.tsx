import { useEffect, useRef } from "react";
import { CaseStudyCard } from "../components/careerCard";
import { motion, useScroll, useTransform } from "framer-motion";
import SoftwareEngineer from "../assets/softwareEngineer.png";
import QAEngineer from "../assets/qaEngineer.png";
import MobileDeveloper from "../assets/mobileDeveloper.png";

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
    imageUrl: MobileDeveloper,
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
    imageUrl: MobileDeveloper,
    description: (
      <>  
        Dashur AI, LLC is an emerging tech firm in the Las Vegas metropolitan area. We are looking to hire an experienced DevOps Engineer to help us keep growing. If you're hard-working and dedicated, Dashur AI is an excellent place to grow your career.
      </>
    ),
  },
];

export const CAREERS = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
      
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);

  return (
    <section 
      ref={containerRef} 
      className="relative flex flex-col items-center w-full px-6 md:px-0"
    >
      
      {/* STICKY HEADER */}
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
{CASE_STUDIES.map((study, index) => (
  <div id={study.id} key={study.id}>
    <CaseStudyCard
      id={study.id} // Changed prop from route to id
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

        <div className="mt-8 flex justify-center">
          <a
            href="./case-studies"
            className="group relative flex items-center gap-2.5 rounded-[30px] border border-white/20 bg-slate-900/50 px-6 py-3 text-white backdrop-blur-md transition-all hover:bg-slate-800 hover:scale-105"
          >
            <span className="font-plus_jakarta_sans_variable text-base font-medium">
              More Details
            </span>
            <img
              alt="Arrow Icon"
              src="/path-to-your-arrow-icon.svg" // Ensure you have a src for the arrow!
              className="h-3 w-3 transition-transform group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>
    </section>
  );
};