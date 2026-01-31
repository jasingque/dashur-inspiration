import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { MobileNavbar } from "./components/mobile-navbar";
import { Footer } from "./components/footer";

const HomePage = lazy(() => import("./pages/home").then(m => ({ default: m.HomePage })));
const AboutPage = lazy(() => import("./pages/about").then(m => ({ default: m.AboutPage })));
const CAPABILITIES = lazy(() => import("./pages/capabilities").then(m => ({ default: m.CAPABILITIES })));
const MarketPage = lazy(() => import("./pages/market").then(m => ({ default: m.MarketPage })));
const CAREERS = lazy(() => import("./pages/careers").then(m => ({ default: m.CAREERS })));
const Contact = lazy(() => import("./pages/contactform").then(m => ({ default: m.Contact })));
const Applyform = lazy(() => import("./pages/applyform"));

export const App = () => {
  return (
    <Router>
      <div className="text-black text-xs not-italic normal-nums font-normal accent-auto bg-slate-950 box-border caret-transparent block tracking-[normal] leading-[normal] list-outside list-disc pointer-events-auto text-start indent-[0px] normal-case visible border-separate font-sans_serif overflow-x-hidden">
        <div className="box-border caret-transparent">
          <div className="relative content-center items-center bg-slate-950 box-border caret-transparent gap-x-0 flex flex-col h-min justify-start min-h-screen gap-y-0">
            <Navbar />
            <MobileNavbar />
            <Suspense fallback={
              <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
              </div>
            }>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/capabilities" element={<CAPABILITIES />} />
                <Route path="/market" element={<MarketPage />} />
                <Route path="/careers" element={<CAREERS />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/job/:id" element={<Applyform />} />
              </Routes>
            </Suspense>
            <div className="box-border caret-transparent"></div>
            <div className="relative box-border caret-transparent grow h-0 w-0 bg-[position:0px_0px]"></div>
            <Footer />
          </div>
          <div className="box-border caret-transparent"></div>
        </div>
      </div>
    </Router>
  );
};