import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { adminAPI } from '../api';

// --- Types ---
interface Responsibility {
  title: string;
  desc: string;
}

interface Position {
  id: string;
  title: string;
  department: string;
  type: 'Full-time' | 'Part-time' | 'Contract';
  status: 'Active' | 'Inactive';
  description: string;
  role_overview: string;
  key_responsibilities: Responsibility[];
}

export const JobDetails = ({ id }: { id?: string }) => {
  const navigate = useNavigate();
  const [position, setPosition] = useState<Position | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosition = async () => {
      if (!id) {
        setError('No position ID provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        console.log('Fetching position with ID/slug:', id);
        
        const positions = await adminAPI.getPositions();
        console.log('All positions from API:', positions);
        console.log('Position IDs from API:', positions.map((pos) => ({ id: pos.id, title: pos.title })));
        
        let foundPosition = positions.find((pos) => pos.id === id);
        console.log('Direct ID match result:', foundPosition);
        
        if (!foundPosition) {
          foundPosition = positions.find((pos) => String(pos.id) === String(id));
          console.log('String ID match result:', foundPosition);
        }
        
        if (!foundPosition && id) {
          foundPosition = positions.find((pos) => 
            pos.title.toLowerCase().replace(/\s+/g, '-') === id.toLowerCase()
          );
          console.log('Title slug match result:', foundPosition);
        }
        
        if (!foundPosition && id) {
          foundPosition = positions.find((pos) => 
            pos.title.toLowerCase().includes(id.toLowerCase()) ||
            id.toLowerCase().includes(pos.title.toLowerCase().replace(/\s+/g, '-'))
          );
          console.log('Partial title match result:', foundPosition);
        }
        
        console.log('Final found position:', foundPosition);
        
        if (foundPosition) {
          const transformedPosition: Position = {
            id: foundPosition.id,
            title: foundPosition.title,
            department: foundPosition.department,
            type: foundPosition.type.charAt(0).toUpperCase() + foundPosition.type.slice(1) as Position['type'],
            status: foundPosition.status.charAt(0).toUpperCase() + foundPosition.status.slice(1) as Position['status'],
            description: foundPosition.description,
            role_overview: foundPosition.role_overview || 'No role overview available.',
            key_responsibilities: foundPosition.key_responsibilities || []
          };
          console.log('Transformed position:', transformedPosition);
          setPosition(transformedPosition);
        } else {
          setError(`Position not found (ID/slug: ${id}). Available positions: ${positions.map(p => p.title).join(', ')}`);
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

  const fallbackContent = {
    overview: 'Join our innovative team and help shape the future of AI.',
    responsibilities: [
      { title: 'Full-Cycle Development', desc: 'Design, test, and deploy software using modern technologies.' },
      { title: 'System Security', desc: 'Develop and monitor proactive security protocols to protect sensitive data.' },
      { title: 'Architecture Optimization', desc: 'Analyze existing code for weaknesses and present strategic plans.' },
      { title: 'Collaborative Leadership', desc: 'Align with clients on requirements while coaching junior team members.' }
    ]
  };

  const content = position ? {
    overview: position.role_overview,
    responsibilities: position.key_responsibilities
  } : fallbackContent;

  const themeMap: Record<string, { border: string; icon: string }> = {
    'Full-time': { border: "border-blue-500", icon: "bg-blue-500/20 text-blue-500" },
    'Part-time': { border: "border-emerald-500", icon: "bg-emerald-500/20 text-emerald-500" },
    'Contract': { border: "border-purple-500", icon: "bg-purple-500/20 text-purple-500" },
    'default': { border: "border-slate-500", icon: "bg-slate-500/20 text-slate-500" }
  };

  const theme = position ? themeMap[position.type] || themeMap['default'] : themeMap['default'];

  if (loading) {
    return (
      <motion.section 
        key={id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-12"
      >
        <div className="text-center text-white">
          <div className="animate-pulse mb-8">
            <div className="w-8 h-8 border-2 border-blue-500 rounded-full mx-auto mb-4"></div>
          </div>
          <p className="text-xl text-gray-400 mb-4">Loading position details...</p>
        </div>
      </motion.section>
    );
  }

  if (error) {
    return (
      <motion.section 
        key={id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-12"
      >
        <div className="text-center text-white">
          <p className="text-xl text-red-400 mb-4">Error loading position details</p>
          <p className="text-sm text-gray-400">{error}</p>
        </div>
      </motion.section>
    );
  }

  return (
    <>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m0 6-2m0 6 2 4-4m0 6-2" />
            </svg>
          </span>
          Key Responsibilities
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {content.responsibilities.map((resp: Responsibility, index: number) => (
            <div 
              key={index}
              className="group bg-white/5 p-6 rounded-2xl border border-white/10 transition-all hover:bg-white/10"
            >
              <h4 className="text-white font-bold mb-2">{resp.title}</h4>
              <p className="text-slate-400 text-sm leading-relaxed">{resp.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
    </>
  );
};