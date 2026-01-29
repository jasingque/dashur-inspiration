import React from "react";

// --- Data & Config ---
const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Capabilities", href: "capabilities" },
  { label: "Market", href: "/market" },
  { label: "Career", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

const SOCIAL_LINKS = [
  { label: "Threads", href: "https://www.threads.net/@dashur_ai" },
  { label: "X/Twitter", href: "https://twitter.com/dashur_ai" },
  { label: "Instagram", href: "https://www.instagram.com/dashur_ai/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/dashur-ai/about/" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "./legal/privacy-policy" },
  { label: "Terms and Conditions", href: "./legal/terms-and-conditions" },
];

// --- Sub-components ---
const SectionHeader = ({ children }: { children: React.ReactNode }) => (
  <p className="mb-4 font-plus_jakarta_sans text-sm font-semibold tracking-wider text-zinc-500 uppercase">
    [ {children} ]
  </p>
);

const FooterLink = ({ href, label }: { href: string; label: string }) => (
  <li>
    <a href={href} className="text-base font-semibold text-white transition-colors hover:text-blue-700">
      {label}
    </a>
  </li>
);

const DashurLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 500 150" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
     <text x="50%" y="75%" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="100" letterSpacing="-6">
       Dashur AI
     </text>
  </svg>
);

// --- Main Component ---
export const Footer = () => {
  return (
    <footer className="relative w-full overflow-hidden pt-20 md:pt-32 pb-20">
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
        <div className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1400px] opacity-[0.05] text-white z-0">
          <DashurLogo className="w-full h-auto" />
        </div>
      </div>
      <div className="relative z-20 mx-auto flex w-full max-w-[1120px] flex-col gap-16 px-6 md:px-0">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div className="flex flex-col gap-10 md:w-1/2">
            
            {/* Call */}
            {/* <div className="flex flex-col items-start md:items-start">
              <SectionHeader> CALL US </SectionHeader>
              <a href="tel:+123456789" className="text-xl font-semibold text-white hover:text-blue-700">
                (702) 960-4800
              </a>
            </div> */}

            {/* Mail */}
            <div className="flex flex-col items-start md:items-start">
              <SectionHeader> MAIL US </SectionHeader>
              <a href="mailto:contact@dashurai.com" className="group relative text-3xl font-bold md:text-4xl">
                <span className="bg-gradient-to-r from-white to-[#4988C4] bg-clip-text text-transparent group-hover:opacity-0 transition-opacity">
                  contact@dashurai.com
                </span>
                <span className="absolute left-0 top-0 bg-gradient-to-r from-[#4988C4] to-white bg-clip-text text-transparent opacity-0 transition-opacity group-hover:opacity-100">
                   contact@dashurai.com
                </span>
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-10 md:flex-row md:gap-20">
            {/* Nav Links */}
            <div className="flex flex-col items-start">
              <SectionHeader> NAVIGATION </SectionHeader>
              <ul className="flex flex-col gap-3">
                {NAV_LINKS.map((link) => <FooterLink key={link.label} {...link} />)}
              </ul>
            </div>

            {/* Social Links */}
            <div className="flex flex-col items-start">
              <SectionHeader> FOLLOW US </SectionHeader>
              <ul className="flex flex-col gap-3">
                {SOCIAL_LINKS.map((link) => <FooterLink key={link.label} {...link} />)}
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 border-t border-zinc-800 pt-8 text-sm text-zinc-400 md:flex-row">
          <p>© 2026 Dashur AI. All rights reserved.</p>
          <div className="flex items-center gap-2">
            {LEGAL_LINKS.map((link, i) => (
              <React.Fragment key={link.href}>
                <a href={link.href} className="hover:text-white">{link.label}</a>
                {i < LEGAL_LINKS.length - 1 && <span className="h-1 w-1 rounded-full bg-white"></span>}
              </React.Fragment>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span>MADE BY <span className="text-[#4988C4]">Dashur AI</span></span>
          </div>
        </div>
      </div>
    </footer>
  );
};