import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "./components/navbar";
import { MobileNavbar } from "./components/mobile-navbar";
import { Footer } from "./components/footer";

const AuthPage = lazy(() => import("./components/AuthPage"));
const HomePage = lazy(() => import("./pages/home").then(m => ({ default: m.HomePage })));
const AboutPage = lazy(() => import("./pages/about").then(m => ({ default: m.AboutPage })));
const CAPABILITIES = lazy(() => import("./pages/capabilities").then(m => ({ default: m.CAPABILITIES })));
const MarketPage = lazy(() => import("./pages/market").then(m => ({ default: m.MarketPage })));
const CAREERS = lazy(() => import("./pages/careers").then(m => ({ default: m.CAREERS })));
const Contact = lazy(() => import("./pages/contactform").then(m => ({ default: m.Contact })));
const Applyform = lazy(() => import("./pages/applyform"));

const AdminLogin = lazy(() => import("./adminDash/Login"));
const AdminDashboard = lazy(() => import("./adminDash/Dashboard"));
const DashboardHome = lazy(() => import("./adminDash/DashboardHome"));
const PositionsManagement = lazy(() => import("./adminDash/Positions"));
const ApplicationsManagement = lazy(() => import("./adminDash/Applications"));
const ContactsManagement = lazy(() => import("./adminDash/Contacts"));

const AppContent = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/auth';
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <div className="text-black text-xs not-italic normal-nums font-normal accent-auto bg-slate-950 box-border caret-transparent block tracking-[normal] leading-[normal] list-outside list-disc pointer-events-auto text-start indent-0 normal-case visible border-separate font-sans_serif h-full">
      <div className="relative bg-slate-950 min-h-full">
        {!isAuthPage && !isAdminPage && <Navbar />}
        {!isAuthPage && !isAdminPage && <MobileNavbar />}
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
            <Route path="/auth" element={<AuthPage />} />
            
            {/* Admin Dashboard Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />}>
              <Route index element={<DashboardHome />} />
              <Route path="positions" element={<PositionsManagement />} />
              <Route path="applications" element={<ApplicationsManagement />} />
              <Route path="contacts" element={<ContactsManagement />} />
            </Route>
          </Routes>
        </Suspense>
        <div className="box-border caret-transparent"></div>
        <div className="relative box-border caret-transparent grow h-0 w-0 bg-position-[0px_0px]"></div>
        {!isAuthPage && !isAdminPage && <Footer />}
      </div>
      <div className="box-border caret-transparent"></div>
    </div>
  );
};

export const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};