import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Helmet } from 'react-helmet-async';
import { JobDetails } from '../components/JobDetails';
import { ApplicationForm } from '../components/ApplicationForm';
import { careersAPI, Position } from '../api';

export default function ApplyForm() {
  const { id } = useParams<{ id: string }>();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [position, setPosition] = useState<Position | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosition = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const positions = await careersAPI.getPositions();
        const foundPosition = positions.find(pos => 
          pos.title.toLowerCase().replace(/\s+/g, '-') === id
        );
        
        if (foundPosition) {
          setPosition(foundPosition);
        } else {
          setError('Position not found');
        }
      } catch (err) {
        setError('Failed to load position details');
        console.error('Error fetching position:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosition();
  }, [id]);

  const getJobTitle = useCallback(() => {
    if (position?.title) {
      return position.title;
    }
    
    if (id) {
      return id
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
    
    return undefined;
  }, [position, id]);

  const getPositionId = () => {
    if (position && position.id) {
      return position.id;
    }
    return undefined;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const jobTitle = getJobTitle();
    if (jobTitle && jobTitle !== 'Position') {
      document.title = `${jobTitle} - Dashur AI`;
    }
  }, [position, id, getJobTitle]);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      setIsSubmitted(true);
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    }, 500);
  };

  if (loading) {
    return (
      <div className="min-h-screen text-white px-6 py-12 lg:py-24 font-plus_jakarta_sans_variable flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen text-white px-6 py-12 lg:py-24 font-plus_jakarta_sans_variable flex justify-center items-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Position Not Found</h1>
          <p className="text-gray-400 mb-8">{error}</p>
          <button 
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const jobTitle = getJobTitle();

  return (
    <div className="min-h-screen text-white px-6 py-12 lg:py-24 font-plus_jakarta_sans_variable">
      <Helmet>
        <title>{jobTitle} - Dashur AI | Job Application</title>
        <meta name="description" content={`Apply for the ${jobTitle} position at Dashurai - Join our innovative AI team and shape the future with cutting-edge technology.`} />
        <meta name="keywords" content={`${jobTitle}, Dashurai careers, AI jobs, tech careers, job application, ${jobTitle} position`} />
        <link rel="canonical" href={`https://www.dashurai.com/job/${id}`} />
        <meta property="og:title" content={`${jobTitle} - Dashur AI | Job Application`} />
        <meta property="og:description" content={`Apply for the ${jobTitle} position at Dashurai - Join our innovative AI team.`} />
        <meta property="og:url" content={`https://www.dashurai.com/job/${id}`} />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* LEFT: STICKY SIDEBAR */}
        <div className="lg:col-span-4 lg:sticky lg:top-24">
          <div className="border-l-2 border-blue-500 pl-6">
            <h2 className="text-xs tracking-widest text-blue-500 font-bold uppercase">Dashur AI</h2>
            <h1 className="text-4xl font-bold mt-2">{jobTitle}</h1>
            {position && (
              <div className="mt-4 space-y-2">
                <p className="text-gray-400 text-sm">
                  <span className="font-semibold">Department:</span> {position.department}
                </p>
                <p className="text-gray-400 text-sm">
                  <span className="font-semibold">Type:</span> {position.type}
                </p>
                <p className="text-gray-400 text-sm">
                  <span className="font-semibold">Status:</span> {position.status}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: CONTENT & FORM */}
        <div className="lg:col-span-8 space-y-20">
          <JobDetails id={id} />
          <AnimatePresence mode="wait">
            <ApplicationForm 
              onSubmit={handleApply} 
              isSubmitted={isSubmitted} 
              jobTitle={jobTitle} 
              positionId={getPositionId()}
            />
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}