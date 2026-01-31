import { motion } from 'framer-motion';

interface FormProps {
  onSubmit: (e: React.FormEvent) => void;
  isSubmitted: boolean;
  jobTitle?: string;
}

export const ApplicationForm = ({ onSubmit, isSubmitted, jobTitle }: FormProps) => {
  if (isSubmitted) {
    return (
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-blue-600 rounded-[2rem] p-12 text-center text-white">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>
        </div>
        <h2 className="text-3xl font-bold mb-2">Success!</h2>
        <p className="text-blue-100">Application for {jobTitle} sent.</p>
      </motion.div>
    );
  }

  return (
    <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-zinc-950 rounded-[2rem] p-8 md:p-12 shadow-2xl text-white border border-zinc-800">
      <h2 className="text-3xl font-bold mb-6">Apply Today</h2>
      
      <form onSubmit={onSubmit} className="space-y-6">
        {/* Position Selection (Pre-filled & Read Only) */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Position Applied For</label>
          <input 
            type="text" 
            value={jobTitle} 
            readOnly 
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-400 font-medium cursor-default outline-none" 
          />
        </div>

        {/* Name Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">First Name</label>
            <input required placeholder="Jane" className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600 text-white placeholder:text-zinc-600" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Last Name</label>
            <input required placeholder="Doe" className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600 text-white placeholder:text-zinc-600" />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Email Address</label>
          <input required type="email" placeholder="jane@example.com" className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600 text-white placeholder:text-zinc-600" />
        </div>

        {/* Resume Upload */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Attach Resume (PDF)</label>
          <div className="relative group">
            <input 
              required 
              type="file" 
              accept=".pdf,.doc,.docx"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
            />
            <div className="w-full bg-zinc-900 border-2 border-dashed border-zinc-800 rounded-xl px-4 py-8 flex flex-col items-center justify-center group-hover:bg-zinc-800/50 transition-colors">
              <svg className="w-8 h-8 text-zinc-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
              <p className="text-sm text-zinc-500 font-medium">Click to upload or drag and drop</p>
            </div>
          </div>
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-500 transition-all active:scale-[0.98] shadow-lg shadow-blue-900/20">
          Submit Application
        </button>
      </form>
    </motion.section>
  );
};