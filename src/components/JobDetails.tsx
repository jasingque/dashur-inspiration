import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// --- Types ---
interface Responsibility {
  title: string;
  desc: string;
}

interface JobRole {
  overview: string;
  responsibilities: Responsibility[];
}

// --- Data ---
const JOB_CONTENT: Record<string, JobRole> = {
  "software-developer": {
    overview: "As a Software Developer at Dashur AI, LLC, you will be a key architect in our mission to deliver elite AI-driven solutions. You are building the backbone of a regional leader.",
    responsibilities: [
      { title: "Full-Cycle Development", desc: "Design, test, and deploy software using Java, C++, PHP, and Python." },
      { title: "System Security", desc: "Develop and monitor proactive security protocols to protect sensitive data." },
      { title: "Architecture Optimization", desc: "Analyze existing code for weaknesses and present strategic plans." },
      { title: "Collaborative Leadership", desc: "Align with clients on requirements while coaching junior team members." }
    ]
  },
  "qa-engineer": {
    overview: "As a QA Engineer at Dashur AI, LLC, you are the final gatekeeper of excellence. Your mission is to ensure our AI-driven products are seamless, secure, and superior.",
    responsibilities: [
      { title: "Testing Suites", desc: "Design and execute rigorous test suites to identify defects and bottlenecks." },
      { title: "Bug Analysis", desc: "Document test results with precision and collaborate with devs to resolve errors." },
      { title: "Product Optimization", desc: "Recommend UI/UX improvements to enhance software efficiency." },
      { title: "Strategic Reporting", desc: "Present detailed analysis of software health and maintain documentation." }
    ]
  },
  "mobile-developer": {
    overview: "As a Mobile Developer, you will craft high-performance iOS and Android applications that bring Dashur AI's capabilities to the palms of our users' hands.",
    responsibilities: [
      { title: "Cross-Platform Dev", desc: "Build and maintain mobile applications using React Native or Flutter." },
      { title: "Performance Tuning", desc: "Optimize app responsiveness and battery usage for a seamless experience." },
      { title: "API Integration", desc: "Seamlessly connect mobile frontends with complex AI backend services." },
      { title: "Store Deployment", desc: "Manage the end-to-end release process for App Store and Google Play." }
    ]
  },
  "ios-engineer": {
    overview: "As an iOS Engineer at Dashur AI, LLC, you will be the primary architect of our premium mobile experience. We are looking for a specialist who masters the balance between elegant Apple design and powerful backend integration. From rapid prototyping to deploying secure, encrypted applications, you will ensure our iOS presence is fast, fluid, and visually stunning.",
    responsibilities: [
      { title: "Swift Excellence", desc: "Develop robust and scalable native applications using Swift and SwiftUI." },
      { title: "UI/UX Fidelity", desc: "Implement pixel-perfect designs and fluid animations tailored for iOS." },
      { title: "Core ML Integration", desc: "Leverage Apple’s on-device machine learning to enhance AI performance." },
      { title: "Code Review", desc: "Maintain high code quality through rigorous peer reviews and documentation." }
    ]
  },
  "devops-engineer": {
    overview: "As a DevOps Engineer, you are the bridge between code and cloud. You ensure our infrastructure is scalable, automated, and indestructible.",
    responsibilities: [
      { title: "CI/CD Automation", desc: "Build and maintain automated pipelines for seamless software delivery." },
      { title: "Cloud Infrastructure", desc: "Manage AWS/Azure environments using Infrastructure as Code (Terraform)." },
      { title: "Monitoring & Alerting", desc: "Implement proactive monitoring to ensure 99.9% system uptime." },
      { title: "Containerization", desc: "Scale services efficiently using Docker and Kubernetes orchestration." }
    ]
  }
};

// --- Styling Map ---
const THEME_MAP: Record<string, { border: string; icon: string }> = {
  "software-developer": { border: "border-blue-500", icon: "bg-blue-500/20 text-blue-500" },
  "qa-engineer": { border: "border-emerald-500", icon: "bg-emerald-500/20 text-emerald-500" },
  "mobile-developer": { border: "border-purple-500", icon: "bg-purple-500/20 text-purple-500" },
  "ios-engineer": { border: "border-sky-400", icon: "bg-sky-400/20 text-sky-400" },
  "devops-engineer": { border: "border-orange-500", icon: "bg-orange-500/20 text-orange-500" },
  "default": { border: "border-slate-500", icon: "bg-slate-500/20 text-slate-500" }
};

export const JobDetails = ({ id }: { id?: string }) => {
  const navigate = useNavigate();
  const content = (id && JOB_CONTENT[id]) ? JOB_CONTENT[id] : JOB_CONTENT["software-developer"];
  const theme = (id && THEME_MAP[id]) ? THEME_MAP[id] : THEME_MAP["default"];

  return (
    <motion.section 
      key={id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-12"
    >

      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest group"
      >
        <svg 
          className="w-4 h-4 transition-transform group-hover:-translate-x-1" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Careers
      </button>

      <div className="prose prose-invert max-w-none">
        <h3 className="text-2xl font-bold text-white mb-4">Role Overview</h3>
        <p className={`text-slate-400 text-lg leading-relaxed border-l-4 ${theme.border} pl-6 py-2`}>
          {content.overview}
        </p>
      </div>

      <div>
        <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
          <span className={`${theme.icon} p-2 rounded-lg`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </span>
          Key Responsibilities
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {content.responsibilities.map((item, i) => (
            <div 
              key={i}
              className="group bg-white/5 p-6 rounded-2xl border border-white/10 transition-all hover:bg-white/10"
            >
              <h4 className="text-white font-bold mb-2">{item.title}</h4>
              <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};