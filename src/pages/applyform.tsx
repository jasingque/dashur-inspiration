import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Helmet } from 'react-helmet-async';
import { JobDetails } from '../components/JobDetails';
import { ApplicationForm } from '../components/ApplicationForm';

export default function ApplyForm() {
  const { id } = useParams<{ id: string }>();
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Helper function to get job title directly without string manipulation
  const getJobTitle = (jobId: string | undefined) => {
    const jobTitles: { [key: string]: string } = {
      'software-developer': 'Software Developer',
      'qa-engineer': 'QA Engineer',
      'mobile-developer': 'Mobile Developer',
      'ios-engineer': 'iOS Engineer',
      'devops-engineer': 'DevOps Engineer'
    };
    return jobTitles[jobId || ''] || '';
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    // Force title update for job position with direct mapping
    if (id) {
      document.title = `${getJobTitle(id)} - Dashurai`;
    }
  }, [id]);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      setIsSubmitted(true);
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    }, 500);
  };

  return (
    <div className="min-h-screen text-white px-6 py-12 lg:py-24 font-plus_jakarta_sans_variable">
      <Helmet>
        <title>{getJobTitle(id)} - Dashurai | Job Application</title>
        <meta name="description" content={`Apply for the ${getJobTitle(id)} position at Dashurai - Join our innovative AI team and shape the future with cutting-edge technology.`} />
        <meta name="keywords" content={`${getJobTitle(id)}, Dashurai careers, AI jobs, tech careers, job application, ${getJobTitle(id)} position`} />
        <link rel="canonical" href={`https://www.dashurai.com/job/${id}`} />
        <meta property="og:title" content={`${getJobTitle(id)} - Dashurai | Job Application`} />
        <meta property="og:description" content={`Apply for the ${getJobTitle(id)} position at Dashurai - Join our innovative AI team.`} />
        <meta property="og:url" content={`https://www.dashurai.com/job/${id}`} />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* LEFT: STICKY SIDEBAR */}
        <div className="lg:col-span-4 lg:sticky lg:top-24">
          <div className="border-l-2 border-blue-500 pl-6">
            <h2 className="text-xs tracking-widest text-blue-500 font-bold uppercase">Dashur AI</h2>
            <h1 className="text-4xl font-bold mt-2">{getJobTitle(id)}</h1>
          </div>
        </div>

        {/* RIGHT: CONTENT & FORM */}
        <div className="lg:col-span-8 space-y-20">
          <JobDetails id={id} />
          <AnimatePresence mode="wait">
            <ApplicationForm 
              onSubmit={handleApply} 
              isSubmitted={isSubmitted} 
              jobTitle={getJobTitle(id)} 
            />
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}