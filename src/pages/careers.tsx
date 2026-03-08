import { useEffect, useRef, useState } from "react";
import { CaseStudyCard } from "../components/careerCard";
import { motion, useScroll, useTransform } from "framer-motion";
import { Helmet } from 'react-helmet-async';
import { useNavigate } from "react-router-dom";
import { careersAPI, Position } from "../api";
import SoftwareEngineer from "../assets/softwareEngineer.webp";
import QAEngineer from "../assets/qaEngineer.webp";
import MobileDeveloper from "../assets/mobileDeveloper.webp";
import IOSDeveloper from "../assets/iosEngineer.webp";
import DevOpsEngineer from "../assets/DevOpsEngineer.webp";

interface CareerPosition {
  id: string;
  title: string;
  tags: string[];
  imageUrl: string;
  description: React.ReactNode;
}

export const CAREERS = ({ limit, isHomePage = false }: { limit?: number, isHomePage?: boolean }) => {
  const navigate = useNavigate();
  const [positions, setPositions] = useState<CareerPosition[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isHomePage) {
      window.scrollTo(0, 0);
      document.title = "Careers - Dashur AI";
    }
    
    const fetchPositions = async () => {
      try {
        const data = await careersAPI.getPositions();
        const transformedData = data.map((position: Position, index: number) => {
          const images = [SoftwareEngineer, QAEngineer, MobileDeveloper, IOSDeveloper, DevOpsEngineer];
          const id = position.title.toLowerCase().replace(/\s+/g, '-');
          
          return {
            id,
            title: position.title,
            tags: [position.employment_type || position.type, position.status_display || position.status].filter((tag): tag is string => Boolean(tag)),
            imageUrl: images[index % images.length],
            description: (
              <>
                {position.description || `Dashur AI, LLC. is hiring a talented ${position.title} professional to join our team. If you're excited to be part of a winning team, Dashur AI is a great place to grow your career.`}
              </>
            ),
          };
        });
        setPositions(transformedData);
      } catch (err) {
        console.error('Error fetching positions:', err);
        setPositions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPositions();
  }, [isHomePage]);
      
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const displayedStudies = limit ? positions.slice(0, limit) : positions;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-white">
        <div>Loading careers...</div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{isHomePage ? "Careers - Dashur AI" : "Careers - Dashur AI"}</title>
        <meta name="description" content="Join our team at Dashurai - Explore career opportunities in AI, software development, and technology innovation" />
      </Helmet>
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
    <span className="absolute -right-full top-[25%] h-1/4 w-full bg-cyan-600 transition-all duration-500 group-hover:right-0" />
    <span className="absolute -left-full top-[50%] h-1/4 w-full bg-cyan-600 transition-all duration-500 group-hover:left-0" />
    <span className="absolute -bottom-full left-0 h-1/4 w-full bg-cyan-600 transition-all duration-500 group-hover:bottom-0" />
  </button>
</div>
        )}
      </div>
    </section>
    </>
  );
};