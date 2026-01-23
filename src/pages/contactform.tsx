export const Contact = () => {
  return (
    <section id="contact" className="relative content-center items-center box-border caret-transparent gap-x-0 flex flex-col shrink-0 h-min justify-center gap-y-0 w-full overflow-hidden px-6 py-[70px] md:px-0 md:py-[135px]">
      <div className="relative content-start items-start box-border caret-transparent gap-x-8 flex flex-col shrink-0 h-min justify-center max-w-[1120px] gap-y-8 w-full z-[2]">
        <div className="relative content-start items-start box-border caret-transparent gap-x-6 flex flex-col shrink-0 h-min justify-center gap-y-6 w-full">
          <h2 className="text-white text-5xl font-bold box-border caret-transparent mb-4">Detailed Inquiry</h2>
          <p className="text-zinc-400 text-lg box-border caret-transparent mb-8">Provide your information to connect with you. We respect your privacy. We will not share your personal information.</p>
        </div>
        
        <form className="w-full max-w-2xl space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-white text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                placeholder="Your name"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-white text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                placeholder="your@email.com"
                required
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="position" className="block text-white text-sm font-medium mb-2">Company</label>
            <input
              type="text"
              id="position"
              name="position"
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
              placeholder="position"
            />
          </div>
          
          <div>
            <label htmlFor="message" className="block text-white text-sm font-medium mb-2">Message</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all resize-none"
              placeholder="Tell us about your project..."
              required
            ></textarea>
          </div>
          
          <button
            type="submit"
            className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-full transition-all duration-300 shadow-lg shadow-violet-500/50 hover:shadow-violet-500/70"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};
