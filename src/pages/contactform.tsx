import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { contactAPI } from '../api';

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
      <input id={id} className={inputStyles} {...(props as React.InputHTMLAttributes<HTMLInputElement>)} />
    )}
  </div>
);

export const Contact: React.FC = () => {
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
          window.scrollTo(0, 0);
          document.title = "Contact Us - Dashur AI";
      }, []);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitting(true);
      setError(null);
      setSuccess(false);

      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      
      try {
        const firstName = formData.get('first_name') as string;
        const lastName = formData.get('last_name') as string;
        const email = formData.get('email') as string;
        const subject = formData.get('subject') as string;
        const message = formData.get('message') as string;

        if (!firstName?.trim()) {
          setError('First name is required.');
          return;
        }
        if (!lastName?.trim()) {
          setError('Last name is required.');
          return;
        }
        if (!email?.trim()) {
          setError('Email is required.');
          return;
        }
        if (!subject?.trim()) {
          setError('Subject is required.');
          return;
        }
        if (!message?.trim() || message.length < 10) {
          setError('Message must be at least 10 characters long.');
          return;
        }

        const contactData = {
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          email: email.trim(),
          subject: subject.trim(),
          message: message.trim()
        };

        await contactAPI.submitContact(contactData);
        setSuccess(true);
        form.reset();
      } catch (err) {
        setError('Failed to send message. Please try again.');
        console.error('Contact form submission error:', err);
      } finally {
        setSubmitting(false);
      }
    };

  return (
    <>
      <Helmet>
        <title>Contact Us - Dashur AI</title>
        <meta name="description" content="Get in touch with Dashur AI. Provide your information to connect with us for detailed inquiries about our AI solutions." />
        <meta name="keywords" content="contact, inquiry, AI solutions, Dashur AI, get in touch" />
        <meta property="og:title" content="Contact Us - Dashur AI" />
        <meta property="og:description" content="Get in touch with Dashur AI. Provide your information to connect with us for detailed inquiries about our AI solutions." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Contact Us - Dashur AI" />
        <meta name="twitter:description" content="Get in touch with Dashur AI. Provide your information to connect with us for detailed inquiries about our AI solutions." />
      </Helmet>
      <section id="contact" className="relative w-full px-6 pt-32 pb-20 overflow-hidden flex justify-center items-center">

        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-600/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-16 items-center z-10">
    
          <div className="space-y-6">
            <span className="text-zinc-500 font-mono text-sm tracking-widest uppercase">[ Contact Us ]</span>
            <h2 className="text-white text-5xl md:text-6xl font-bold leading-tight">
              Detailed<br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-indigo-400">
                Inquiry
              </span>
            </h2>
            <p className="text-zinc-400 text-lg max-w-md">
              Provide your information to connect with you. We respect your privacy. We will not share your personal information.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm space-y-6 shadow-2xl">
            
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {success && (
              <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-3">
                <p className="text-green-400 text-sm">Message sent successfully! We'll get back to you soon.</p>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field id="first_name" name="first_name" label="First Name" placeholder="Jane" required />
              <Field id="last_name" name="last_name" label="Last Name" placeholder="Doe" required />
            </div>

            {/* Contact Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field id="subject" name="subject" label="Subject" placeholder="How can we help?" required />
              <Field id="email" name="email" label="Work Email" type="email" placeholder="jane@company.com" required />
            </div>

            <Field id="message" name="message" label="Message" isTextArea placeholder="Tell us about your needs..." required minLength={10} />

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-2">
              <p className="text-xs text-zinc-500 text-center sm:text-left">
                By submitting, you agree to our <br className="hidden sm:block"/>
                <a href="#" className="text-white hover:underline">Terms</a> and <a href="#" className="text-white hover:underline">Privacy Policy</a>.
              </p>

              {/* Button */}
              <button 
                className="group relative overflow-hidden rounded border-2 border-blue-950 bg-transparent px-6 py-2 text-xs font-bold uppercase text-white transition-all duration-500 hover:text-[#0c071e] disabled:opacity-50"
                type="submit"
                disabled={submitting}
              >
                <span className="relative z-10 transition-all duration-500 tracking-wider">
                  {submitting ? 'Sending...' : 'Submit'}
                </span>
                <span className="absolute left-0 -top-full h-1/4 w-full bg-cyan-600 transition-all duration-500 group-hover:top-0" />
                <span className="absolute right-full top-[25%] h-1/4 w-full bg-cyan-600 transition-all duration-500 group-hover:right-0" />
                <span className="absolute left-full top-[50%] h-1/4 w-full bg-cyan-600 transition-all duration-500 group-hover:left-0" />
                <span className="absolute bottom-full left-0 h-1/4 w-full bg-cyan-600 transition-all duration-500 group-hover:bottom-0" />
              </button>
            </div>
          </form>

        </div>
      </section>
    </>
  );
};