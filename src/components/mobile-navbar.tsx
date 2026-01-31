import { useState, useEffect } from "react";
import { Link, useLocation} from "react-router-dom";
import logo from "../assets/logo.webp";

export const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "About", path: "/about" },
    { name: "Capabilities", path: "/capabilities" },
    { name: "Market", path: "/market" },
    { name: "Career", path: "/careers" },
    { name: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleNavClick = (e: React.MouseEvent, path: string) => {
    setIsOpen(false);
    if (location.pathname === path) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {/* Mobile Navbar */}
      <div className="md:hidden fixed top-0 left-0 w-full z-[1003] transition-all duration-300">
        <div className={`transition-all duration-300 ${
          isScrolled 
            ? "bg-slate-950/95 backdrop-blur-lg shadow-lg border-b border-slate-800/50" 
            : "bg-transparent"
        }`}>
          <div className="flex items-center justify-between px-4 py-4">
            {/* Logo */}
            <Link to="/" onClick={(e) => handleNavClick(e, "/")} className="flex items-center">
              <img src={logo} alt="logo" className="h-10 w-auto object-contain" />
            </Link>

            {/* Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative w-8 h-8 flex flex-col justify-center items-center group"
            >
              <span className={`absolute h-0.5 w-6 bg-current transition-all duration-300 ease-in-out ${
                isOpen ? "rotate-45 translate-y-0" : "-translate-y-2"
              } ${location.pathname === "/" && !isScrolled ? "text-white" : "text-white"}`} />
              <span className={`h-0.5 w-6 bg-current transition-all duration-300 ease-in-out ${
                isOpen ? "opacity-0" : "opacity-100"
              } ${location.pathname === "/" && !isScrolled ? "text-white" : "text-white"}`} />
              <span className={`absolute h-0.5 w-6 bg-current transition-all duration-300 ease-in-out ${
                isOpen ? "-rotate-45 translate-y-0" : "translate-y-2"
              } ${location.pathname === "/" && !isScrolled ? "text-white" : "text-white"}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`md:hidden fixed inset-0 z-[1002] transition-all duration-300 ${
        isOpen 
          ? "opacity-100 visible" 
          : "opacity-0 invisible pointer-events-none"
      }`}>
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-slate-950 transition-all duration-300 ${
            isOpen ? "bg-opacity-95" : "bg-opacity-0"
          }`}
          onClick={() => setIsOpen(false)}
        />

        {/* Menu Content */}
        <div className={`relative h-full flex flex-col transition-all duration-300 ease-in-out ${
          isOpen 
            ? "translate-x-0" 
            : "translate-x-full"
        }`}>
          <div className="flex-1 flex flex-col pt-20 px-6 pb-6 overflow-y-auto">
            {/* Navigation Links */}
            <nav className="flex-1 flex flex-col justify-center space-y-8">
              {navLinks.map((link, index) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={(e) => handleNavClick(e, link.path)}
                  className={`group relative text-2xl font-medium transition-all duration-300 ${
                    location.pathname === link.path ? "text-cyan-400" : "text-white"
                  }`}
                  style={{
                    animationDelay: isOpen ? `${index * 100}ms` : '0ms'
                  }}
                >
                  <span className="relative z-10 block py-2">
                    {link.name}
                  </span>
                  <div className={`absolute bottom-0 left-0 h-0.5 bg-cyan-400 transition-all duration-300 ${
                    location.pathname === link.path ? "w-full" : "w-0 group-hover:w-full"
                  }`} />
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="mt-12">
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="group relative inline-flex items-center justify-center w-full px-8 py-4 font-semibold text-white bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl overflow-hidden transition-all duration-300 hover:from-cyan-500 hover:to-blue-500 hover:scale-105"
              >
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>
            </div>
          </div>

          {/* Bottom Gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
        </div>
      </div>
    </>
  );
};
