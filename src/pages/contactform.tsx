import React, { useEffect } from 'react';

const inputStyles = "w-full px-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all";
const labelStyles = "block text-white text-sm font-medium mb-2";

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  id: string;
  isTextArea?: boolean;
}

const Field: React.FC<FieldProps> = ({ label, id, isTextArea, ...props }) => (
  <div>
    <label htmlFor={id} className={labelStyles}>{label}</label>
    {isTextArea ? (
      <textarea id={id} className={`${inputStyles} resize-none`} rows={4} {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)} />
    ) : (
      <input id={id} className={inputStyles} {...props} />
    )}
  </div>
);

export const Contact: React.FC = () => {
    useEffect(() => {
          // start from top
          window.scrollTo(0, 0);
      }, []);
  return (
    <section id="contact" className="relative w-full px-6 pt-32 pb-20 overflow-hidden flex justify-center items-center">

      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-600/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-16 items-center z-10">
        
        {/* Left Content */}
        <div className="space-y-6">
          <span className="text-zinc-500 font-mono text-sm tracking-widest uppercase">[ Contact Us ]</span>
          <h2 className="text-white text-5xl md:text-6xl font-bold leading-tight">
            Detailed<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
              Inquiry
            </span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-md">
            Provide your information to connect with you. We respect your privacy. We will not share your personal information.
          </p>
        </div>

        {/* Right Form Card */}
        <form className="w-full bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm space-y-6 shadow-2xl">
          
          {/* Row 1: Names */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field id="firstname" name="firstname" label="First Name" placeholder="Jane" required />
            <Field id="lastname" name="lastname" label="Last Name" placeholder="Doe" required />
          </div>

          {/* Row 2: Contact Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field id="phone" name="phone" label="Phone" type="tel" placeholder="+1 (555) 000-0000" />
            <Field id="email" name="email" label="Work Email" type="email" placeholder="jane@company.com" required />
          </div>

          {/* Row 3: Message */}
          <Field id="message" name="message" label="Message" isTextArea placeholder="Tell us about your needs..." required />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-2">
            <p className="text-xs text-zinc-500 text-center sm:text-left">
              By submitting, you agree to our <br className="hidden sm:block"/>
              <a href="#" className="text-white hover:underline">Terms</a> and <a href="#" className="text-white hover:underline">Privacy Policy</a>.
            </p>
            <button 
              type="submit" 
              className="w-full sm:w-auto px-8 py-3 bg-gradient-to-br from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-violet-600 text-white font-medium rounded-full transition-all shadow-lg shadow-violet-900/20"
            >
              Submit
            </button>
          </div>
        </form>

      </div>
    </section>
  );
};