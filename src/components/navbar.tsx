import { useState, useEffect } from "react";
import logo from "../assets/logo.png";

export const Navbar = () => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const [isAtTop, setIsAtTop] = useState<boolean>(true);

  const navLinks = [
    { name: "About", href: "./example" },
    { name: "Capabilities", href: "./case-studies" },
    { name: "Market", href: "./example" },
    { name: "Career", href: "./example" },
    { name: "Contact", href: "./example" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      if (currentScrollY > 50) {
        setIsAtTop(false);
      } else {
        setIsAtTop(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className={`fixed top-0 left-0 w-full z-[1002] transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div
        className={`w-full transition-all duration-300 ${
          isAtTop ? "bg-transparent backdrop-blur-none" : "bg-slate-950/80 backdrop-blur-md shadow-lg"
        }`}
      >
        <nav className="mx-auto flex h-20 max-w-[1120px] items-center justify-between px-4 md:px-[15px]">
          
          {/* Logo */}
          <div className="shrink-0 w-40">
            <a href="./?utm_source=veloxthemes&utm_campaign=saaspo">
              <img src={logo} alt="logo" className="h-full w-full object-contain" />
            </a>
          </div>

          {/* Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="group relative flex h-min items-center justify-center gap-2.5 py-1 text-base text-white font-plus_jakarta_sans"
              >
                <span>{link.name}</span>
                <span className="absolute bottom-0 left-0 h-0.5 w-full scale-x-0 bg-white transition-transform duration-300 ease-out origin-bottom-right group-hover:origin-bottom-left group-hover:scale-x-100" />
              </a>
            ))}
          </div>

          {/* Button */}
          <div>
            <button className="group relative overflow-hidden rounded-md border-2 border-blue-950 bg-transparent px-8 py-3 text-sm font-bold uppercase text-white transition-all duration-500 hover:text-[#0c071e]">
              <span className="relative z-10 transition-all duration-500">Join with us</span>
              
              <span className="absolute left-0 top-[-100%] h-[15px] w-full bg-cyan-600 transition-all duration-500 group-hover:top-0" />
              <span className="absolute right-[-100%] top-[10px] h-[15px] w-full bg-cyan-600 transition-all duration-500 group-hover:right-0" />
              <span className="absolute left-[-100%] top-[20px] h-[15px] w-full bg-cyan-600 transition-all duration-500 group-hover:left-0" />
              <span className="absolute bottom-[-100%] left-0 h-[15px] w-full bg-cyan-600 transition-all duration-500 group-hover:bottom-0" />
            </button>
          </div>
          
        </nav>
      </div>
    </div>
  );
};