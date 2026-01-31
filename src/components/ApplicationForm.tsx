import { motion } from 'framer-motion';

interface FormProps {
  onSubmit: (e: React.FormEvent) => void;
  isSubmitted: boolean;
  jobTitle?: string;
}

export const ApplicationForm = ({ onSubmit, isSubmitted, jobTitle }: FormProps) => {
  if (isSubmitted) {
    return (
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        className="bg-[#0a0f1d]/60 backdrop-blur-xl border border-blue-500/30 rounded-[2rem] p-12 text-center text-white"
      >
        <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(59,130,246,0.5)]">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold mb-2">Success!</h2>
        <p className="text-blue-200">Application for {jobTitle} sent.</p>
      </motion.div>
    );
  }

  return (
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-[2.5rem] blur-2xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>
      <div className="absolute -left-20 top-1/4 w-40 h-40 bg-blue-500/20 rounded-full blur-[80px] pointer-events-none"></div>

      <motion.section 
        initial={{ opacity: 0, y: 40 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true }} 
        className="relative bg-zinc-950/45 backdrop-blur-xl rounded-[2rem] p-8 md:p-12 shadow-2xl text-white border border-white/10"
      >
        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
          Application Form
        </h2>
        
        <form onSubmit={onSubmit} className="space-y-6">
          {/* Position Selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Position</label>
            <input 
              type="text" 
              value={jobTitle} 
              readOnly 
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-zinc-400 font-medium cursor-default outline-none" 
            />
          </div>

          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">First Name</label>
              <input required placeholder="Jane" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all text-white placeholder:text-zinc-700" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Last Name</label>
              <input required placeholder="Doe" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all text-white placeholder:text-zinc-700" />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Email Address</label>
            <input required type="email" placeholder="jane@example.com" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all text-white placeholder:text-zinc-700" />
          </div>

          {/* Resume Upload */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Attach Resume (PDF)</label>
            <div className="relative group/upload">
              <input 
                required 
                type="file" 
                accept=".pdf,.doc,.docx"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
              />
              <div className="w-full bg-white/5 border-2 border-dashed border-white/10 rounded-xl px-4 py-8 flex flex-col items-center justify-center group-hover/upload:bg-white/10 transition-colors">
                <svg className="w-8 h-8 text-zinc-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="text-sm text-zinc-500 font-medium">Click to upload or drag and drop</p>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button 
              type="submit"
              className="group relative overflow-hidden rounded-lg border border-blue-900/50 bg-transparent w-full py-3.5 text-[10px] font-bold uppercase text-white transition-all duration-500 hover:text-[#0c071e] hover:shadow-[0_0_20px_rgba(8,145,178,0.2)] active:scale-[0.99]"
            >
              <span className="relative z-10 transition-all duration-500 tracking-[0.4em]">
                Submit Application
              </span>
              <span className="absolute left-0 -top-full h-1/4 w-full bg-cyan-600 transition-all duration-500 group-hover:top-0" />
              <span className="absolute right-[-100%] top-[25%] h-1/4 w-full bg-cyan-600 transition-all duration-500 group-hover:right-0" />
              <span className="absolute left-[-100%] top-[50%] h-1/4 w-full bg-cyan-600 transition-all duration-500 group-hover:left-0" />
              <span className="absolute bottom-[-100%] left-0 h-1/4 w-full bg-cyan-600 transition-all duration-500 group-hover:bottom-0" />
            </button>
          </div>
        </form>
      </motion.section>
    </div>
  );
};