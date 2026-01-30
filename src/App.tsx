import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/home";
import { AboutPage } from "./pages/about";
import { CAPABILITIES } from "./pages/capabilities";
import { MarketPage } from "./pages/market";
import { CAREERS } from "./pages/careers";
import { Contact } from "./pages/contactform";
import { Navbar } from "./components/navbar";
import { MobileNavbar } from "./components/mobile-navbar";
import { Footer } from "./components/footer";
import Applyform from "./pages/applyform";

export const App = () => {
  return (
    <Router>
      <div className="text-black text-xs not-italic normal-nums font-normal accent-auto bg-slate-950 box-border caret-transparent block tracking-[normal] leading-[normal] list-outside list-disc pointer-events-auto text-start indent-[0px] normal-case visible border-separate font-sans_serif">
        <div className="box-border caret-transparent">
          <div className="relative content-center items-center bg-slate-950 box-border caret-transparent gap-x-0 flex flex-col h-min justify-start min-h-screen gap-y-0">
            <Navbar />
            <MobileNavbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/capabilities" element={<CAPABILITIES />} />
              <Route path="/market" element={<MarketPage />} />
              <Route path="/careers" element={<CAREERS />} />
              <Route path="/contact" element={<Contact />} />
              <Route path ="/job/:id" element={<Applyform />} />
            </Routes>
            <div className="box-border caret-transparent"></div>
            <div className="relative box-border caret-transparent grow h-0 w-0 bg-[position:0px_0px]"></div>
            <Footer />
          </div>
          <div className="box-border caret-transparent"></div>
        </div>
        <iframe
          src="https://dashurai.com/"
          className="fixed hidden h-[1000px] w-screen z-[2147483647] left-0 top-0"
        ></iframe>
      </div>
    </Router>
          
  );
};